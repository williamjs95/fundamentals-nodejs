import { randomUUID } from 'node:crypto';
import database from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

export const routes = [
  {
    method: 'GET', 
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      
      const { search } = req.query;

      const users = database.select('users', search ? {
        name: search,
        email: search,
      } : null);

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST', 
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        name,
        email,
      };
      database.insert('users', user);
      res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      
      database.update('users', id, {
        name,
        email, 
      })

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'), 
    handler: (req, res) => {
      console.log(req.params);
      const { url } = req;
      const match = url.match(buildRoutePath('/users/:id'));
      if (match) {
        const id = match[1];
        database.delete('users', id);
        res.writeHead(200).end('User deleted');
      } else {
        res.writeHead(400).end('Invalid user ID');
      }
    },
  }
];
