import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  type FieldValue,
  type Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Personalisation } from '@/types';

export interface FirebaseOrder {
  id: string;
  customerName: string;
  mobile: string;
  whatsapp: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  functionType: string;
  eventDate: string;
  language?: string;
  instructions?: string;
  items: Array<{
    templateId: number;
    templateName: string;
    colorway: string;
    language: string;
    quantity: number;
    unitPrice: number;
    personalisation?: Personalisation;
  }>;
  totalAmount: number;
  deliveryCharge: number; // Always 0
  status: 'Pending Contact' | 'Proof Approved' | 'In Production' | 'Dispatched' | 'Delivered';
  createdAt?: Timestamp | FieldValue | null;
}

export interface FirebaseCustomisationDraft {
  id: string;
  templateId: number;
  colorwayIndex: number;
  language: string;
  personalisation: Personalisation;
  updatedAt?: Timestamp | FieldValue | null;
}

// 1. Order Operations
export async function createFirebaseOrder(order: Omit<FirebaseOrder, 'createdAt'>): Promise<string> {
  try {
    const orderRef = doc(db, 'orders', order.id);
    await setDoc(orderRef, {
      ...order,
      deliveryCharge: 0,
      createdAt: serverTimestamp()
    });
    return order.id;
  } catch (error) {
    console.error('Error saving order to Firebase Firestore:', error);
    throw error;
  }
}

export async function fetchFirebaseOrders(): Promise<FirebaseOrder[]> {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const orders: FirebaseOrder[] = [];
    snapshot.forEach((docSnap) => {
      orders.push(docSnap.data() as FirebaseOrder);
    });
    return orders;
  } catch (error) {
    console.warn('Error fetching orders from Firebase (fallback to local if offline):', error);
    return [];
  }
}

export async function updateFirebaseOrderStatus(orderId: string, status: FirebaseOrder['status']): Promise<void> {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
  } catch (error) {
    console.error('Error updating order status in Firebase:', error);
    throw error;
  }
}

// 2. Customisation Draft Operations
export async function saveFirebaseDraft(draft: FirebaseCustomisationDraft): Promise<void> {
  try {
    const draftRef = doc(db, 'customisation_drafts', draft.id);
    await setDoc(draftRef, {
      ...draft,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn('Error syncing draft to Firebase Firestore:', error);
  }
}

export async function getFirebaseDraft(draftId: string): Promise<FirebaseCustomisationDraft | null> {
  try {
    const draftRef = doc(db, 'customisation_drafts', draftId);
    const snapshot = await getDoc(draftRef);
    if (snapshot.exists()) {
      return snapshot.data() as FirebaseCustomisationDraft;
    }
    return null;
  } catch (error) {
    console.warn('Error loading draft from Firebase:', error);
    return null;
  }
}

// 3. Admin Atelier Settings / Pricing & Promotions
export async function saveFirebaseAtelierSettings(settings: {
  priceOverrides?: Record<number, number>;
  activeStatusOverrides?: Record<number, boolean>;
  promotions?: { discount: number; limit: number; active: boolean };
}): Promise<void> {
  try {
    const settingsRef = doc(db, 'atelier_settings', 'global');
    await setDoc(settingsRef, {
      ...settings,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn('Error updating Firebase atelier settings:', error);
  }
}

export async function getFirebaseAtelierSettings() {
  try {
    const settingsRef = doc(db, 'atelier_settings', 'global');
    const snapshot = await getDoc(settingsRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    console.warn('Error loading Firebase atelier settings:', error);
    return null;
  }
}

