import { useState, useEffect, useCallback } from 'react';
import type { Personalisation } from '@/types';
import { emptyPersonalisation } from '@/context/CartContext';
import { saveFirebaseDraft, getFirebaseDraft } from '@/lib/firebaseService';

const PREFIX = 'aurelia-draft-';

export function useDraft(templateId: number) {
  const key = `${PREFIX}${templateId}`;
  const [draft, setDraft] = useState<Personalisation>(emptyPersonalisation());

  useEffect(() => {
    // 1. Instant local storage retrieval for zero latency
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDraft({ ...emptyPersonalisation(), ...JSON.parse(raw) });
      else setDraft(emptyPersonalisation());
    } catch {
      setDraft(emptyPersonalisation());
    }

    // 2. Cloud restoration from Firebase if available
    getFirebaseDraft(key).then((cloudDraft) => {
      if (cloudDraft && cloudDraft.personalisation) {
        setDraft((prev) => ({ ...prev, ...cloudDraft.personalisation }));
      }
    }).catch(() => {});
  }, [key]);

  const save = useCallback((p: Personalisation) => {
    setDraft(p);
    // Persist locally
    try {
      localStorage.setItem(key, JSON.stringify(p));
    } catch {
      // ignore
    }
    // Sync with Firebase Firestore backend
    saveFirebaseDraft({
      id: key,
      templateId,
      colorwayIndex: 0,
      language: 'en',
      personalisation: p,
    }).catch(() => {});
  }, [key, templateId]);

  const reset = useCallback(() => {
    setDraft(emptyPersonalisation());
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }, [key]);

  return { draft, save, reset };
}
