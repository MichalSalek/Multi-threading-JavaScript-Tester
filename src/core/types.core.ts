import { Socket } from 'socket.io-client'



declare global {

    // Declaring the client side possibility of assignment Socket to Window Global Object
    //
    interface Window {
        clientSocket: Socket | undefined
    }


    // https://fettblog.eu/typescript-array-includes/
    //
    interface ReadonlyArray<T> {
        includes(searchElement: unknown, fromIndex?: number): searchElement is T;
    }


    // FPS monitor - stats.js remake of .min.js file
    //
    interface StatsRemake {
        showPanel: UnknownFunctionType<number>
        dom: HTMLElement
        update: UnknownFunctionType
    }

}

// Function type created to type unknown functions e.g. from 3rd libraries.
// Use it with generics to define the type, or leave unknown (not recommended).
//
export type UnknownFunctionType<T = undefined, D = unknown> = ((arg0?: T) => D)

