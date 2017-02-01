// 
//
//  Seed data for the Firebase database. Execution: npm run populate-db
//
//
// =======================================================================================

import { database, initializeApp } from 'firebase';
import { firebaseConfig } from './src/environments/firebase.config';
import { dbDataExercises, dbDataWorkouts, dbDataCategories } from './db-data';


console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);


const workoutsRef = database().ref('workouts');
const exercisesRef = database().ref('exercises');
const categoriesRef = database().ref('categories');

// ------------------------------------------------------------
// add workout items to the database
// ------------------------------------------------------------
let workoutKeys = [];

dbDataWorkouts.workouts.forEach( workout => {

  console.log('adding workout', workout.url);

  workoutKeys.push(workoutsRef.push({
      name: workout.name,
      description: workout.description,
      url: workout.url,
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
      name: exercise.name,
      note: exercise.note,
      url: exercise.url
    }).key);
});

console.log('exerciseKeys: ' + exerciseKeys);

// ------------------------------------------------------------
// add exercise item keys per workout to the database
// ------------------------------------------------------------
const association = database().ref('exercisesPerWorkout');

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
      name: category.name,
      url: category.url
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
const association2 = database().ref('exercisesPerCategory');

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
