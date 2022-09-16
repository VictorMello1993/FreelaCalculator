import { AppError } from "../../errors/AppError";
import { ViaCEP } from "viacep";
import { AddressModel } from "../../types/AddressModel";

export async function FindAddress(zipCode: string): Promise<AddressModel> {
  try {
    const viacep = new ViaCEP();

    const { logradouro, complemento, bairro, localidade, uf } = await viacep.cep(zipCode);

    return {
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
    };
  } catch (error) {
    throw new AppError("ZipCode not found", 404);
  }
}
