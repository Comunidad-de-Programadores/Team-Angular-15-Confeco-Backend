// Imports modules.
import { Request, Response } from "express";

export class UserController {
    async profile(req: Request, res: Response): Promise<void> {
        res.status(200).json({
            message: `Im ${ req.params.id } profile from controller.`
        });
    }
};
