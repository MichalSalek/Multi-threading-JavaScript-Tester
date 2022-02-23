## Multithreading JavaScript Tester Application

###                       

contact@michalsalek.pl

###                       

##### App inspired by DDD, CQS and Event Sourcing methodologies

###### Driven by Developer Experience for fast UI develop and debugging

###                                  

## What does it do?

This tool can overload your CPU by doing a no-sense calculations - through the browser's main thread or another CPU
threads - through the WebWorkers.

As a user, you can set the complexity of the calculations and observe smoothness of a sample animation. You should
monitor yours CPU threads usage also.

###                             

The AMD Ryzen 9 5950X 16 x 4.0GHz processor can be loaded even over 80% by JavaScript interpretations:

![performance](https://michalsalek.pl/public_files/performance.png)

###                              

### Characteristics of the App:

###                              

- WebSocket realtime communication by events
- WebWorkers activity simulation
- Architecture designed by Commands and Queries Separation
- Structure focused on business Features as subdomains living in the App - to force development processes
- Most of the Features has its own functional and declarative API
- Forced TS typing keeps the App data with no leaks and exceptions
- Optimized for nice performance with ESLint React strict rules with //no-bypassing
- Keeping UX in well collaboration with a user

###                         

### Fundamental instance state is reactive broadcasting by Redux to the UI consumers

![redux](https://michalsalek.pl/public_files/reduxdev.png)

###                        

## More technical stuff:

###### Technologies stack

> Next.js  
> TypeScript strict mode  
> React strict mode  
> ESLint strict mode  
> Redux toolkit (with a thunk also)  
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

![structure](https://michalsalek.pl/public_files/struktura.png)

###                                   

###                        

### TASKS TODO:

- Implement i18n for the whole hard-typed text content.
- Implement error handling for WebWorkers. Now all errors are collected with no action at the Redux store.
- Implement network error detector and add a spin-loader into each organism component.
- Implement tests for App Features.

###                                  

###         

###### Avoid these empty words with no value in yours var names:

> Generic  
> Common  
> Manager  
> Service   
> Util  
> Helper  
> ...

[Issues](https://github.com/MichalSalek/Multithreading-JavaScript-Tester)

###          

```sh
echo contact@michalsalek.pl
```
