import { useState, useEffect, useCallback } from 'react';
import type { Personalisation } from '@/types';
import { emptyPersonalisation } from '@/context/CartContext';

const PREFIX = 'aurelia-draft-';

export function useDraft(templateId: number) {
  const key = `${PREFIX}${templateId}`;
  const [draft, setDraft] = useState<Personalisation>(emptyPersonalisation());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDraft({ ...emptyPersonalisation(), ...JSON.parse(raw) });
      else setDraft(emptyPersonalisation());
    } catch {
      setDraft(emptyPersonalisation());
    }
  }, [key]);

  const save = useCallback((p: Personalisation) => {
    setDraft(p);
    try {
      localStorage.setItem(key, JSON.stringify(p));
    } catch {
      // ignore
    }
  }, [key]);

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
