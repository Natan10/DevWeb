import { Request, Response, NextFunction } from "express";

class AuthController {
  async handle(req: Request, res: Response, next: NextFunction) {
    console.log("passei aqui", req.body.nome);
    next();
  }
}

export { AuthController };
