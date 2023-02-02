## Multithread JavaScript Tester Application

Live: https://multithread.michalsalek.pl/

TypeScript with Next.js and node.js with ES modules  
Main goal: Real time and high reactivity.  
Really ease UI development (no prop drilling and data passing).  

###                       

contact@michalsalek.pl

###                       

##### App inspired by DDD, CQRS and Event Sourcing goods.

###                                  

### What does it do?

This tool can overload your CPU by doing a no-sense calculations:
- through the JS compiler main thread, or
- another CPU threads in one time, through the WebWorkers.

As a user, you can set the complexity of the calculations and observe smoothness changing of a sample animation. 
To get the best results you should monitor yours CPU threads usage also.

###                             

### Example test on higher complexity:

The AMD Ryzen 9 5950X 16 x 4.0GHz processor can be loaded even over 80% by JavaScript interpretations:

![performance](https://michalsalek.pl/public_files/performance.png)

###                              

### Characteristics of the App:

###                              

- WebSocket realtime communication by events
- WebWorkers activity simulation
- The architecture was designed following the DDD, CQRS and Event Sourcing models.
- Structure focused on business Features as subdomains living in the App - to force development processes
- Most of the features has its own functional and declarative API
- Forced TS typing keeps the App data with no leaks and exceptions
- Optimized for nice performance 
- Coded with ESLint React strict rules with //no-bypassing
- Collecting logs with events included to files

###                         

### Fundamental instance state is reactive broadcasting by Redux to the UI consumers

![redux](https://michalsalek.pl/public_files/reduxdev.png)

###                        

## More technical stuff:

###### Technologies stack

> Next.js  
> TypeScript strict mode  
> React strict mode  
> ESLint strict plugins  
> Redux toolkit (thunk used)  
> Node.js with TypeScript  
> socket.io

###### Project structure

- `App components` - generic UI atoms to keep uniformity.
- `Redux Slices` - each per subdomain.
- `Features` - divided by:
    - `Background` the code without UI JSX like: local storage handling or the WebWorkers config.
    - `Building` the code with UI directories filled with atomic design components. Organisms, molecules and atoms
      place.
- `React JSX compositions` inside the layout dir - to extend components functionality with a common features.
- `Simply backend` in this case has a very similar structure.

###                                   

###                        

### TASKS TODO:

- Implement i18n for the whole hard-typed text content.
- Implement error handling for WebWorkers. Now all errors are collected with no action at the Redux store.
- Implement network error detector and add a spin-loader into each organism component.
- Implement tests for App Features.
- others...

###                                  


[Issues](https://github.com/MichalSalek/multithreading/issues)

###          

```sh
contact@michalsalek.pl
```
