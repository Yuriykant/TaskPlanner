import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, addDoc, deleteDoc, doc, updateDoc, orderBy } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { ITodo } from 'types';

export const initializeAPI = (): FirebaseApp => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDDN1MTxmvqOm-t9h9XcSiChQ6NWSUw0Ag',
    authDomain: 'taskplanner-d5a2a.firebaseapp.com',
    projectId: 'taskplanner-d5a2a',
    storageBucket: 'taskplanner-d5a2a.appspot.com',
    messagingSenderId: '867950106736',
    appId: '1:867950106736:web:dc2199493150fbf8fd7cb5',
  };

  const firebaseApp = initializeApp(firebaseConfig);
  getFirestore(firebaseApp);
  getAuth(firebaseApp);

  return firebaseApp;
};

export const getTodosApi = async (): Promise<ITodo[]> => {
  const db = getFirestore();
  const auth = getAuth();
  const todos: ITodo[] = [];
  const ref = collection(db, 'todo');
  const q = query(ref, where('userId', '==', auth.currentUser?.uid), orderBy('createdAt'));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<ITodo, 'id'>;
      todos.push({ id: doc.id, ...data });
    });
  } catch (error) {
    return Promise.reject(error);
  }
  return todos;
};

export const getWeekTodosApi = async (startDate: Date, endDate: Date): Promise<ITodo[]> => {
  const db = getFirestore();
  const auth = getAuth();
  const todos: ITodo[] = [];
  const ref = collection(db, 'todo');
  const q = query(
    ref,
    where('userId', '==', auth.currentUser?.uid),
    where('selectedDay', '>=', startDate),
    where('selectedDay', '<=', endDate),
    orderBy('createdAt')
  );
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<ITodo, 'id'>;
      todos.push({ id: doc.id, ...data });
    });
  } catch (error) {
    return Promise.reject(error);
  }
  return todos;
};

export const deleteTodoApi = async (id: string): Promise<any> => {
  const db = getFirestore();
  try {
    await deleteDoc(doc(db, 'todo', id));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createTodoApi = async (data: Omit<ITodo, 'id'>): Promise<any> => {
  const db = getFirestore();
  const auth = getAuth();
  try {
    await addDoc(collection(db, 'todo'), { ...data, userId: auth.currentUser?.uid, createdAt: serverTimestamp() });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTodoApi = async (id: string, data: Omit<ITodo, 'id'>): Promise<any> => {
  const db = getFirestore();

  try {
    await updateDoc(doc(db, 'todo', id), { ...data, updatedAt: serverTimestamp() });
  } catch (error) {
    return Promise.reject(error);
  }
};
