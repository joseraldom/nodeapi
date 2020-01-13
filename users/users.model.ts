import { usersRouter } from "./users.router"

const users = [
    {
        id: 1,
        name: 'Peter Parker',
        email: 'pp@marvel.com'
    },
    {
        id: 2,
        name: 'Peter Quill',
        email: 'starlord@marvel.com'
    }
]

export class User {
    findAll() {
        return users
    }

    findById(id) {
        const filtered = users.filter(user => user.id == id)
        let user
        if (filtered.length > 0) {
            user = filtered[0]
        }
        return user
    }
}