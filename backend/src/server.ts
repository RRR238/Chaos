import Fastify from 'fastify';
import jwt from 'jsonwebtoken';
import fastifyCors from '@fastify/cors';
import { Security } from './security';

const fastify = Fastify();
const SECRET_KEY = 'SuperSecretKey';

interface UserPayload {
    id: number;
    username: string;
    role: string;
}

interface IBody {
    email:string;
    password:string;
}

fastify.register(fastifyCors, {
    origin: '*',  // This allows all origins; change it as needed for production (e.g., set it to 'http://localhost:3000' for React frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });


  const users = [
    { meno: 'John', priezvisko: 'Doe', zaplatene: true, od: '2024-01-01', do: '2024-12-31' },
    { meno: 'Jane', priezvisko: 'Smith', zaplatene: false, od: '2024-02-01', do: '2024-12-31' },
    { meno: 'Alice', priezvisko: 'Johnson', zaplatene: true, od: '2024-03-01', do: '2024-11-30' },
  ];
  
  fastify.get('/admin/users', async (request, reply) => {
    try {
      // Extract token from headers
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }
  
      const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
      // Verify JWT
      const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
      if (decoded.role !== 'admin') {
        return reply.status(403).send({ error: 'Forbidden' });
      }
  
      return reply.send(users); // Send mock user data
    } catch (err) {
      return reply.status(401).send({ error: 'Invalid token' });
    }
  });

  fastify.decorate('security', new Security());
  fastify.post<{Body:IBody}>('/login', async (request, reply) => {

    const { security } = fastify as any;
    const {email, password} = request.body;
    const verified:boolean = await security.verifyPassword(password);

    if(verified){
    const mockAdmin: UserPayload = {
        id: 2,
        username: 'User',
        role: 'admin'
    };
    const token = security.createJwtToken(mockAdmin)
    return reply.send({ token });
    }else{
        return reply.send({status:"401"});
    }
});

fastify.post<{Body:IBody}>('/admin-login', async (request, reply) => {
    const {email, password} = request.body
    if(email && password){
    const mockAdmin: UserPayload = {
        id: 2,
        username: 'adminUser',
        role: 'admin'
    };
    const token = jwt.sign(mockAdmin, SECRET_KEY, { expiresIn: '1h' });
    return reply.send({ token });
    }else{
        return reply.send({status:"401"});
    }
});

const start = async () => {
    try {
        await fastify.listen({ port: 5000 });
        console.log('Server is running on http://localhost:5000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
