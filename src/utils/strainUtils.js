import { addMatrices, scalarMultiply } from "./matrixOperations";

export const strainAtZ = (eps0, kap, z) =>
  addMatrices(eps0, scalarMultiply(kap, z));
