import { AddressModel } from "../../types/AddressModel";

export interface IFindAddressProvider {
  FindAddress(zipCode: string): Promise<AddressModel>;
}
