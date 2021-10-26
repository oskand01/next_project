import Image from "next/image";
import Styles from "../styles/Item.module.css";
import { useRouter } from "next/router";

export default function Item (props){
    const router = useRouter();

    const itemName = router.query.itemName;
    
    return (
        <div>
          <Image
            layout={"fill"}
            src={props.item.image}
            objectFit={"cover"}
            alt={props.item.name}
          />
        </div>
    )
}