import { Injectable } from '@angular/core';

// import firestore
import {
   Firestore,
   collection,
   addDoc,
   doc,
   updateDoc,
   deleteDoc,
   getDocs,
   getDoc,
   orderBy,
   query,
   limit,
} from '@angular/fire/firestore';

import { Observable, from, map } from 'rxjs';

// import the film interface
import { Film } from '../types/film.interface';

@Injectable({
   providedIn: 'root',
})
export class FilmService {
   // inject the firestore instance in the film service constructor
   constructor(private firestore: Firestore) {}

   // GET: all films from firestore database
   // this method uses 'from' to convert the promise returned by 'getDocs' into an observable and then uses 'map' to transform the data
   getFilms(collectionName: string): Observable<object[]> {
      // creates a reference to the collection
      const myCollection = collection(this.firestore, collectionName);
      return from(getDocs(myCollection)).pipe(
         map((querySnapshot) => {
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
         })
      );
   }

   // this function retrieves all documents from a specified Firestore collection and transforms them into an array of film objects.
   getAllFilms(): Observable<Film[]> {
      // name of the collection within the database
      const collectionName = 'films';
      // creates a reference to the firestore collection using the collection name and the firestore instance.
      const myCollection = collection(this.firestore, collectionName);
      // - this is where the data fetching and transformation happens
      // - getDocs() retreieves all documents from the specified collection. it returns a promise.
      // - from() converts the Promise returned by getDocs into an Observable
      // - pipe() this allow applying RxJS operators to transform the emitted data
      return from(getDocs(myCollection)).pipe(
         // this operator transforms the emitted 'QuerySnapshot' (which contain the retrieved documents) into an array of film objects.
         map((querySnapshot) => {
            // this interates over each document (doc) in the querySnapshot and applies a transformation to each
            return querySnapshot.docs.map((doc) => {
               // this extracts the data from the document
               const data = doc.data();
               // this creates a film object for each document, populating it properties with the data from the document and the document ID.
               return {
                  id: doc.id,
                  title: data['title'],
                  director: data['director'],
                  releaseDate: data['releaseDate'],
                  genre: data['genre'],
                  summary: data['summary'],
                  createdAt: data['createdAt'],
                  updatedAt: data['updatedAt'],
               } as Film;
            });
         })
      );
   }

   // GET: an individual film by ID - returns an observable
   getFilm(id: string): Observable<Film | Error> {
      const collectionName = 'films';
      // create a reference to the collection
      const docRef = doc(this.firestore, collectionName, id);
      return from(getDoc(docRef)).pipe(
         map((docSnapshot) => {
            // error checking code
            if (docSnapshot.exists()) {
               const data = docSnapshot.data();
               return {
                  id: docSnapshot.id,
                  title: data['title'],
                  director: data['director'],
                  releaseDate: data['releaseDate'],
                  genre: data['genre'],
                  summary: data['summary'],
                  createdAt: data['createdAt'],
                  updatedAt: data['updatedAt'],
               } as Film;
            } else {
               return new Error(`Film with ID ${id} was not found`);
            }
         })
      );
   }

   // GET: an individual film by ID
   async getFilmById(collectionName: string, docId: string) {
      // creates a reference to the collection
      const myDocRef = doc(this.firestore, collectionName, docId);
      const docSnap = await getDoc(myDocRef);
      if (docSnap.exists()) {
         console.log('Document data:', docSnap.data());
         return docSnap.data();
      } else {
         // doc.data() will be undefined in this case
         console.log('No such document!');
         return null;
      }
   }

   // GET: film count from database
   async getFilmCount(collectionName: string): Promise<number> {
      // creates a reference to the specified collection in firestore
      const myCollection = collection(this.firestore, collectionName);
      // retrieves all documents from the collection
      const queryShapshot = await getDocs(myCollection);
      // returns the count of documents
      return queryShapshot.size;
   }

   // GET: recently 10 most recented added films from database
   async getRecentlyCreatedFilms(collectionName: string): Promise<object[]> {
      // creates a reference to the specified collection in firestore
      const myCollection = collection(this.firestore, collectionName);
      // creates a query that orders the documents by a 'createdAt' field in descending order (newest first) and limits the results to 10
      const q = query(myCollection, orderBy('createdAt', 'desc'), limit(10));
      // executes the query and retrieves the documents
      const queryShapshot = await getDocs(q);
      // extracts the documents data and ID into an array
      return queryShapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
   }

   // SAVE METHODS

   // add new film to firestore database
   async addFilm(data: unknown) {
      const collectionName = 'films';
      const myCollection = collection(this.firestore, collectionName);
      // adds a new document to a collection with an auto-generated ID
      const docRef = await addDoc(myCollection, data);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id; // return the document ID
   }

   async deleteFilmById(collectionName: string, docId: string) {
      // the doc method creates a reference to a specific document within a firestore collection
      const myDocRef = doc(this.firestore, collectionName, docId);

      // Deletes the document referred to by the specified DocumentReference.
      await deleteDoc(myDocRef)
         .then(() => console.log('Document successfully deleted!'))
         .catch((error) => console.error('Error removing document: ', error));
   }

   // update a film in firestore database
   async updateFilmById(docId: string, data: object) {
      const collectionName = 'films';
      // use the doc() method creates a reference to a specific document within a firestore collection
      const myDocRef = doc(this.firestore, collectionName, docId);

      await updateDoc(myDocRef, data)
         .then(() => console.log('Document successfully updated'))
         .catch((error) => console.error('Error updating document: ', error));
   }
}
