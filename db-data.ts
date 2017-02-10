// 
//
//  Seed data for the Firebase database. Execution: npm run populate-db
//
//
export const dbDataUsers = {
  'users': [
    {
      'uid': 'J4DoRW0fzvgCa111v7qPGmWyzEn2'
    }
  ]
}


export const dbDataExercises = {
  'exercises': [
    // 0
    {
      'name': 'Bent Row',
      'note': 'Awesome',  
      'url': 'bent-row',
      'workouts': [2],
      'categories': [1]
    },
    // 1    
    {
      'name': 'Bottoms Up Clean',
      'note': 'Awesome',  
      'url': 'bottoms-up-clean',
      'workouts': [],
      'categories': [4]      
    },  
    // 2          
    {
      'name': 'Bridge',
      'note': 'ds',  
      'url': 'bridge',
      'workouts': [1],
      'categories': [0]            
    },
    // 3    
    {
      'name': 'Clean',
      'note': 'dsdsds',  
      'url': 'lean',
      'workouts': [2],
      'categories': [4]           
    },
    // 4    
    {
      'name': 'Double Bent Row',
      'note': 'ewew',  
      'url': 'double-bent-row',
      'workouts': [3,4],
      'categories': [1]            
    },
    // 5    
    {
      'name': 'Double Clean',
      'note': 'dddddd',  
      'url': 'double-clean',
      'workouts': [4],
      'categories': [4]      
    },  
    // 6                  
    {
      'name': 'Double Deadlift',
      'note': 'aaaaa',  
      'url': 'double-deadlift',
      'workouts': [2],
      'categories': [2]           
    },  
    // 7                  
    {
      'name': 'Double Front Squat',
      'note': 'dkjskdkskjd',  
      'url': 'double-front-squat',
      'workouts': [2],
      'categories': [3]           
    },  
    // 8          
    {
      'name': 'Double Jerk',
      'note': 'dlkllskdlskldklscmckx',  
      'url': 'double-jerk',
      'workouts': [4],
      'categories': [5]           
    },  
    // 9          
    {
      'name': 'Double Swing',
      'note': 'roeior',  
      'url': 'double-swing',
      'workouts': [0,2,3],
      'categories': [2]      
    },
    // 10    
    {
      'name': 'Double Thruster',
      'note': 'dlksd',  
      'url': 'double-thruster',
      'workouts': [2,3],
      'categories': [3,5]            
    },
    // 11    
    {
      'name': 'Goblet Squat',
      'note': 'dlskdlkls',  
      'url': 'goblet-squat',
      'workouts': [1,4],
      'categories': [0,3]            
    },
    // 12    
    {
      'name': 'Halo',
      'note': 'roeoiroe',  
      'url': 'halo',
      'workouts': [1],
      'categories': [0,4]           
    },
    // 13    
    {
      'name': 'Hand-To-Hand Swing',
      'note': 'reoitoie',  
      'url': 'hand-to-hand-swing',
      'workouts': [4],
      'categories': [2]           
    },   
    // 14         
    {
      'name': 'Jump Squat',
      'note': 'jvjc', 
      'url': 'jump-squat',
      'workouts': [2],
      'categories': [3]           
    },   
    // 15                
    {
      'name': 'Split Squat',
      'note': 'ret',  
      'url': 'split-squat',
      'workouts': [2],
      'categories': [3]           
    },   
    // 16                          
    {
      'name': 'The Press',
      'note': 'dlskdjksj',  
      'url': 'the-press',
      'workouts': [2],
      'categories': [5]           
    },   
    // 17                                 
    {
      'name': 'The Swing',
      'note': 'roiwori',  
      'url': 'the-swing',
      'workouts': [0],
      'categories': [2]           
    },
    // 18    
    {
      'name': 'Turkish Getup',
      'note': 'öda',  
      'url': 'turkish-getup',
      'workouts': [0],
      'categories': [0]           
    },   
    // 19         
    {
      'name': 'Two Hand Swing',
      'note': 'fkjdkjfei',  
      'url': 'two-hand-swing',
      'workouts': [0],
      'categories': [2]      
    }                  
  ]
}


export const dbDataWorkouts = {
  'workouts': [
    // 0
    {
      'name': 'Simple & Sinister',
      'description': `Pavel Tsatsouline's amazing workout.`,
      'url': 'simple-sinister',
      'exercises': [17, 9, 19, 18]
    },
    // 1    
    {
      'name': 'S & S Warmup',
      'description': `Pavel Tsatsouline's amazing workout warmup.`,
      'url': 's-s-warmup',
      'exercises': [11, 2, 12]
    },
    // 2    
    {
      'name': 'Total Body 24A',
      'description': 'Description: ...',
      'url': 'total-body-24A',
      'exercises': [7, 0, 3, 16]
    },
    // 2        
    {
      'name': 'Lower Body 4',
      'description': 'Description: ...',
      'url': 'lower-body-4',
      'exercises': [9, 6, 10, 15, 14]
    },
    // 3        
    {
      'name': 'Total Body 23A',
      'description': 'Description: ...',
      'url': 'total-body-23a',
      'exercises': [9, 4, 10, 1]
    },
    // 4        
    {
      'name': 'Total Body 23B',
      'description': 'Description: ...',
      'url': 'total-body-23b',
      'exercises': [13, 11, 5, 8, 4]
    },
  ]
}

export const dbDataCategories = {
  'categories': [
    // 0
    {
      'name': 'Core Stability and Dynamic Mobility',
      'exercises': [2, 11, 12, 18],
      'url': 'core-stability-and-dynamic-mobility'
    },
    // 1    
    {
      'name': 'Horizontal Pull',
      'exercises': [0, 4],
      'url': 'horizontal-pull'
    },  
    // 2              
    {
      'name': 'Lower Body - Hip Emphasis',
      'exercises': [6, 9, 13, 17, 19],
      'url': 'lower-body-hip-emphasis'
    },
    // 3    
    {
      'name': 'Lower Body - Knee Emphasis',
      'exercises': [7, 10, 11, 14, 15],
      'url': 'lower-body-knee-emphasis'
    },  
    // 4          
    {
      'name': 'Vertical Pull',
      'exercises': [1, 5, 12],
      'url': 'vertical-pull'
    },  
    // 5          
    {
      'name': 'Vertical Push',
      'exercises': [8, 10, 16],
      'url': 'vertical-push'
    },    
  ]
}


