import { injectable } from "inversify";
import { ViaCEP } from "viacep";
import { IFindAddressProvider } from "../../core/providers/IFindAddressProvider";
import { AppError } from "../../errors/AppError";
import { AddressModel } from "../../types/AddressModel";

@injectable()
export class ViaCepFindAddressProvider implements IFindAddressProvider {
  async FindAddress(zipCode: string): Promise<AddressModel> {
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
}
