import {Express, Query, Response, Send} from 'express-serve-static-core'
import {ServerOptions} from 'socket.io'


// Types request and response
// https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
//
export interface RequestBodyType<T> extends Express.Request {
	body: T
}


export interface RequestQueryType<T extends Query> extends Express.Request {
	query: T
}


export interface RequestType<T extends Query, U> extends Express.Request {
	body: U,
	query: T
}


export interface ResponseType<ResBody> extends Express.Response, Express.Response {
	json: Send<ResBody, this>;
	sendStatus: (StatusCode: number) => Response;
}


export interface ResponseSocketType extends ResponseType<unknown> {
	socket: {
		server: Partial<ServerOptions>
	}
}


export const IPNumberRegExp = new RegExp('(\\b25[0-5]|\\b2[0-4][0-9]|\\b[01]?[0-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}', 'gm')
