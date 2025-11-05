import Client from "@/models/client";


type Props = {
  client: Client;
};

export default function SelectClient({ client }: Props) {
  return (
    <option value={client.id}>{client.name || client.companyName}</option>
  );
}
