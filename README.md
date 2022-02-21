# Multithreading Javascript Tester Application

contact@michalsalek.pl

#### App inspired by DDD, CQS and Event Sourcing methodologies

###### Driven by Developer Experience for fast UI develop and debugging

#         

# What does it do?

##### This tool can overload your CPU by doing no-sense calculations - through the browser's main thread or other CPU threads - through WebWorkers.

##### As a user, you can set the complexity of the calculations and observe sample animation and your CPU threads usage.

#         

##### The AMD Ryzen 9 5959X 16 x 4 GHz processor is over 80% loaded by Javascript interpretations:

![performance](https://michalsalek.pl/public_files/performance.png)

#         

#         

#         

## Characteristics

- WebSocket communication
- WebWorkers activity simulation
- Architecture designed by Commands and Queries Separation
- Structure focused on business Features as subdomains living in the App to force development processes
- Each Function has its own functional and declarative API
- Forced TS typing to keep app data with no leaks and exceptions
- Optimized for nice performance with ESLint React strict rules with no bypassing
- Keeping UX in well collaboration with an user

#         

## More technical

> Next.js
> TypeScript strict mode
> React strict mode
> Redux toolkit with thunk
> Node.js with TypeScript
> socket.io

- `App components` - generic UI atoms to keep uniformity
- `Redux Slices` - each per subdomain
- `Features` - divided by:
    - `Background` with no UI components like local storage handling WebWorkers config
    - `Building` with UI directories. Organisms, molecules and atoms subdomain pleace
- `React JSX compositions` in the layout dir - to extend components with another common features
- `Simply backend` in this case has a very simillar structure

![structure](https://michalsalek.pl/public_files/struktura.png)

#         

#         

#         

## Fundamental instance state is reactive boardcasting by Redux

![redux](https://michalsalek.pl/public_files/reduxdev.png)

```sh
echo
```
