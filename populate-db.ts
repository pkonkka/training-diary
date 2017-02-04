// 
//
//  Seed data for the Firebase database. Execution: npm run populate-db
//
//
// =======================================================================================

import { database, initializeApp } from 'firebase';
import { firebaseConfig } from './src/environments/firebase.config';
import { dbDataExercises, dbDataWorkouts, dbDataCategories, dbDataUsers } from './db-data';
import * as _ from 'lodash';


console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);


const usersRef = database().ref('users');

// ------------------------------------------------------------
// add an user item to the database
// ------------------------------------------------------------
let userKeys = [];
let userIdRef;

dbDataUsers.users.forEach( user => {
  console.log('adding user', user.uid);

  // userKeys.push(usersRef.push({
  //   uid: user.uid
  // }));
  userIdRef = usersRef.child(user.uid);
});
console.log('userKeys: ' + userKeys);

const workoutsRef = userIdRef.child('workouts');
const exercisesRef = userIdRef.child('exercises');
const categoriesRef = userIdRef.child('categories');


// ------------------------------------------------------------
// add workout items to the database
// ------------------------------------------------------------
let workoutKeys = [];

dbDataWorkouts.workouts.forEach( workout => {

  console.log('adding workout', workout.url);

  workoutKeys.push(workoutsRef.push({
      name:         workout.name,
      description:  workout.description,
      url:          workout.url,
      createdAt:    _.now(),
      modifiedAt:   _.now()
  }).key);
});

console.log('workoutKeys: ' + workoutKeys);


// ------------------------------------------------------------
// add exercise items to the database
// ------------------------------------------------------------
let exerciseKeys = [];
dbDataExercises.exercises.forEach(exercise =>  {

  console.log('adding exercise ', exercise.url);

  exerciseKeys.push(exercisesRef.push({
      name:       exercise.name,
      note:       exercise.note,
      url:        exercise.url,
      createdAt:  _.now(),
      modifiedAt: _.now()
    }).key);
});

console.log('exerciseKeys: ' + exerciseKeys);

// ------------------------------------------------------------
// add exercise item keys per workout to the database
// ------------------------------------------------------------
const association = userIdRef.child('exercisesPerWorkout');

for (let i = 0; i < Number(dbDataWorkouts.workouts.length); i++) {
  for (let j = 0; j < Number(dbDataWorkouts.workouts[i].exercises.length); j++) {

    let exercisesPerWorkout = association.child(workoutKeys[i]);
    let exerciseWorkoutAssociation = exercisesPerWorkout.child(exerciseKeys[dbDataWorkouts.workouts[i].exercises[j]]);

    exerciseWorkoutAssociation.set(true);

  }
}


// ------------------------------------------------------------
// add exercise items to the database
// ------------------------------------------------------------
let categoryKeys = [];
dbDataCategories.categories.forEach(category =>  {

  console.log('adding category ', category.name);

  categoryKeys.push(categoriesRef.push({
      name:       category.name,
      url:        category.url,
      createdAt:  _.now(),
      modifiedAt: _.now()
    }).key);
});

console.log('categoryKeys: ' + categoryKeys);



// ------------------------------------------------------------
// add category item keys per exercise to the database
// ------------------------------------------------------------
// const association2 = database().ref('categoriesPerExercise');

// for (let i = 0; i < Number(dbDataExercises.exercises.length); i++) {
//   for (let j = 0; j < Number(dbDataExercises.exercises[i].categories.length); j++) {

//     let categoriesPerExercise = association2.child(exerciseKeys[i]);
//     let categoryExerciseAssociation = categoriesPerExercise.child(categoryKeys[dbDataExercises.exercises[i].categories[j]]);

//     categoryExerciseAssociation.set(true);

//   }
// }

// ------------------------------------------------------------
// exercises per category
// ------------------------------------------------------------
const association2 = userIdRef.child('exercisesPerCategory');

for (let i = 0; i < Number(dbDataCategories.categories.length); i++) {

  for (let j = 0; j < Number(dbDataCategories.categories[i].exercises.length); j++) {

    let exercisesPerCategory = association2.child(categoryKeys[i]);
    let exerciseCategoryAssociation = exercisesPerCategory.child(exerciseKeys[dbDataCategories.categories[i].exercises[j]]);

    exerciseCategoryAssociation.set(true);


  }
}

// for (let i = 0; i < Number(dbDataExercises.exercises.length); i++) {
//   for (let j = 0; j < Number(dbDataExercises.exercises[i].categories.length); j++) {

//     let categoriesPerExercise = association2.child(exerciseKeys[i]);
//     let categoryExerciseAssociation = categoriesPerExercise.child(categoryKeys[dbDataExercises.exercises[i].categories[j]]);

//     categoryExerciseAssociation.set(true);

//   }
// }
