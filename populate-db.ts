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
import * as moment from 'moment';


console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);


const usersRef = database().ref('users');

// ------------------------------------------------------------
// add an user item to the database
// ------------------------------------------------------------
const userKeys = [];
let userIdRef;

dbDataUsers.users.forEach( user => {
  console.log('adding user', user.uid);

  // userKeys.push(usersRef.push({
  //   uid: user.uid
  // }));
  userIdRef = usersRef.child(user.uid);
});

const workoutsRef = userIdRef.child('workouts');
const exercisesRef = userIdRef.child('exercises');
const categoriesRef = userIdRef.child('categories');



// ------------------------------------------------------------
// add exercise items to the database
// ------------------------------------------------------------
const exerciseKeys = [];
dbDataExercises.exercises.forEach(exercise =>  {

  console.log('adding exercise ', exercise.url);

  exerciseKeys.push(exercisesRef.push({
      name:       exercise.name,
      note:       exercise.note,
      url:        exercise.url,
      // createdAt:  _.now(),
      // modifiedAt: _.now()
      createdAt:  moment().format(),
      modifiedAt: moment().format()
    }).key);
});

console.log('exerciseKeys: ' + exerciseKeys);


// ------------------------------------------------------------
// add category items and related exercises to the database
// ------------------------------------------------------------
// const association4 = categoriesRef.child('exercises');
const categoryKeys = [];
let counter = 0;


dbDataCategories.categories.forEach(category =>  {

  console.log('adding category ', category.name);

  categoryKeys.push(categoriesRef.push({
      name:       category.name,
      url:        category.url,
      createdAt:  moment().format(),
      modifiedAt: moment().format()      
      // createdAt:  _.now(),
      // modifiedAt: _.now()
    }).key);


  let association4 = categoriesRef.child(categoryKeys[counter]);
  association4 = association4.child('exercises');

  for (let j = 0; j < Number(dbDataCategories.categories[counter].exercises.length); j++) {

    console.log('j: ' + j + ': ' + exerciseKeys[dbDataCategories.categories[counter].exercises[j]]);

    // console.log(dbDataWorkouts.workouts[counter].exercises.length)
    // const exercisesPerCategory = association4.child(categoryKeys[counter]);
    const exerciseCategoryAssociation = association4.child(exerciseKeys[dbDataCategories.categories[counter].exercises[j]]);
    exerciseCategoryAssociation.set(true);

    }

  counter++;

});

console.log('categoryKeys: ' + categoryKeys);



// ------------------------------------------------------------
// add exercise item keys per workout to the database
// ------------------------------------------------------------
// const association = userIdRef.child('exercisesPerWorkout');

// for (let i = 0; i < Number(dbDataWorkouts.workouts.length); i++) {
//   for (let j = 0; j < Number(dbDataWorkouts.workouts[i].exercises.length); j++) {

//     let exercisesPerWorkout = association.child(workoutKeys[i]);
//     let exerciseWorkoutAssociation = exercisesPerWorkout.child(exerciseKeys[dbDataWorkouts.workouts[i].exercises[j]]);

//     exerciseWorkoutAssociation.set(true);

//   }
// }







// ------------------------------------------------------------
// add workout items and related exercises to the database
// ------------------------------------------------------------
// const exerciseWorkoutAssociation = workoutsRef.child('exercises');
const workoutKeys = [];
counter = 0;

dbDataWorkouts.workouts.forEach( workout => {

  console.log('adding workout', workout.url);

  workoutKeys.push(workoutsRef.push({
      name:         workout.name,
      description:  workout.description,
      url:          workout.url,
      createdAt:  moment().format(),
      modifiedAt: moment().format()      
      // createdAt:    _.now(),
      // modifiedAt:   _.now()
  }).key);

  let association5 = workoutsRef.child(workoutKeys[counter]);
  association5 = association5.child('exercises');
  

  for (let j = 0; j < Number(dbDataWorkouts.workouts[counter].exercises.length); j++) {

    // console.log(dbDataWorkouts.workouts[counter].exercises.length)
    // const exercisesPerWorkout = exerciseWorkoutAssociation.child(workoutKeys[counter]);
    const exerciseWorkoutAssociation = association5.child(exerciseKeys[dbDataWorkouts.workouts[counter].exercises[j]]);
    exerciseWorkoutAssociation.set(true);
    }

  counter++;
});

console.log('workoutKeys: ' + workoutKeys);


// ------------------------------------------------------------
// add workout keys to exercise records
// ------------------------------------------------------------
// const exerciseKeys = [];
// dbDataExercises.exercises.forEach(exercise =>  {

//   console.log('adding exercise ', exercise.url);

//   exerciseKeys.push(exercisesRef.push({
//       name:       exercise.name,
//       note:       exercise.note,
//       url:        exercise.url,
//       createdAt:  _.now(),
//       modifiedAt: _.now()
//     }).key);
// });

// console.log('exerciseKeys: ' + exerciseKeys);


  // let association = association.child()


// Go through all exercises
for (let i = 0; i < Number(dbDataExercises.exercises.length); i++) {


  let association = exercisesRef.child(exerciseKeys[i]);
  association = association.child('workouts');


  // Go through all workouts in an exercise
  for (let j = 0; j < Number(dbDataExercises.exercises[i].workouts.length); j++) {

    // const workoutsPerExercise = association.child(exerciseKeys[i]);
    const workoutExerciseAssociation = association.child(workoutKeys[dbDataExercises.exercises[i].workouts[j]]);

    workoutExerciseAssociation.set(true);
  }

}

// ------------------------------------------------------------
// add category keys to exercise records
// ------------------------------------------------------------

// Go through all exercises
for (let i = 0; i < Number(dbDataExercises.exercises.length); i++) {

  let association2 = exercisesRef.child(exerciseKeys[i]);
  association2 = association2.child('categories');


  // Go through all categories in an exercise
  for (let j = 0; j < Number(dbDataExercises.exercises[i].categories.length); j++) {

    // const categoriesPerExercise = association2.child(exerciseKeys[i]);
    const categoryExerciseAssociation = association2.child(categoryKeys[dbDataExercises.exercises[i].categories[j]]);

    categoryExerciseAssociation.set(true);
  }

}



// ------------------------------------------------------------
// add exercise item keys per workout to the database
// ------------------------------------------------------------
// const association = userIdRef.child('exercisesPerWorkout');

// for (let i = 0; i < Number(dbDataWorkouts.workouts.length); i++) {
//   for (let j = 0; j < Number(dbDataWorkouts.workouts[i].exercises.length); j++) {

//     let exercisesPerWorkout = association.child(workoutKeys[i]);
//     let exerciseWorkoutAssociation = exercisesPerWorkout.child(exerciseKeys[dbDataWorkouts.workouts[i].exercises[j]]);

//     exerciseWorkoutAssociation.set(true);

//   }
// }





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
// const association2 = userIdRef.child('exercisesPerCategory');

// for (let i = 0; i < Number(dbDataCategories.categories.length); i++) {

//   for (let j = 0; j < Number(dbDataCategories.categories[i].exercises.length); j++) {

//     let exercisesPerCategory = association2.child(categoryKeys[i]);
//     let exerciseCategoryAssociation = exercisesPerCategory.child(exerciseKeys[dbDataCategories.categories[i].exercises[j]]);

//     exerciseCategoryAssociation.set(true);


//   }
// }

// for (let i = 0; i < Number(dbDataExercises.exercises.length); i++) {
//   for (let j = 0; j < Number(dbDataExercises.exercises[i].categories.length); j++) {

//     let categoriesPerExercise = association2.child(exerciseKeys[i]);
//     let categoryExerciseAssociation = categoriesPerExercise.child(categoryKeys[dbDataExercises.exercises[i].categories[j]]);

//     categoryExerciseAssociation.set(true);

//   }
// }
