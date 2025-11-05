
import Service from "@/models/service";

type Props = {
  service: Service;
};

export default function SelectService({ service }: Props) {
  return (
    <>
    <option value={service.id}>{service.nameService}</option>
    </>
  );
}
