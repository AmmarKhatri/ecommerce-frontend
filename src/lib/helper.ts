import { toast } from "@/components/ui/use-toast";
import { getAuthToken } from "@/context/AuthStorage";
import { GraphQLResult } from "@/types";
import axios from "axios";
interface Props<T> {
    query: string;
    variables?: T;
    headers?: any;
}
export function validateFields({image, description, name, quantity, price}: any){
  if (image ===""|| description ===""|| name ===""|| quantity === 0|| price === 0) {
      toast({
          variant: "destructive",
          title: "Invalid Fields",
          description: "Please enter all valid fields"
      })
      return false
  }
  return true
}
export function CheckAuth(){
  const token = getAuthToken()
  if(token){
      if (token === ""){
        return false
      } else {
        return true
      }
  } else {
    return false
  }
}
export const graphQlApiHandler = async <Input, Output = {}>({
    query,
    variables,
    headers,
  }: Props<Input>): Promise<
    | {
        data: GraphQLResult<Output>;
        headers: any;
      }
    | { error: string }
  > => {
    try {
      const res = await axios.post(
        `http://localhost:3000/query`,
        {
          query: query,
          variables,
        },
        { headers: headers }
      );
  
      console.log(res);
  
      if (res.data.errors) {
        // const message = handleGraphqlApiError(res.data)?.message;
        throw new Error();
      }
  
      return { headers: res.headers, data: res.data };
    } catch (error) {
      console.log(error);
      //@ts-ignore,
      return { error: error.message };
    }
  };
  