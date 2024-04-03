import { RouteShorthandOptions } from "fastify";

export const registerOptions: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['name' , 'username' , 'email' , 'password' , 'confirmPassword'],
            properties: {
                name: {type: 'string'},
                username: {type: 'string'},
                email: {type: 'string'},
                password: {type: 'string' ,$id: 'password' , minLength: 8 , maxLength: 30},
                confirmPassword: {$ref: 'password'},
            }
        },
        response: {
            200: {
                type: 'object',
                required: ['message'],
                properties: {
                    message: {type: "string"}
                }
            }
        }
    }
}

