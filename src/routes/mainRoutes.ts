import { Router } from "express";
import authRoutes from "./authRoutes";

const mainRoutes=Router();

mainRoutes.use('/api/v1/',authRoutes)
export default mainRoutes