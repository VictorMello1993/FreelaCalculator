import axios from "axios";

export async function FindAddress(zipCode: string): Promise<any> {
  const VIACEP_URL = `https://viacep.com.br/ws/${zipCode}/json/`;

  const { data } = await axios.get(VIACEP_URL);

  return data;
}
