// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   getDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { getAuth, signOut } from "firebase/auth";

// const db = getFirestore();

// export default {
//   methods: {
//     async fetchData(collectionName, filters = []) {
//       const collRef = collection(db, collectionName);
//       const q = query(collRef, ...filters);
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     },

//     async getDocument(collectionName, id) {
//       const docRef = doc(db, collectionName, id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         return { id: docSnap.id, ...docSnap.data() };
//       } else {
//         console.error("Documento não encontrado");
//         return null;
//       }
//     },

//     async deleteDocument(collectionName, id) {
//       try {
//         await deleteDoc(doc(db, collectionName, id));
//         this.$q.notify({
//           type: "positive",
//           message: "Documento excluído com sucesso!",
//         });
//       } catch (error) {
//         console.error("Erro ao excluir documento:", error);
//         this.$q.notify({
//           type: "negative",
//           message: "Erro ao excluir documento.",
//         });
//       }
//     },

//     async logout() {
//       const auth = getAuth();
//       signOut(auth).then(() => {
//         this.$router.push("/login");
//       });
//     },
//   },
// };
