import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import classes from "./ChatItem.module.scss";



export function ChatItemSkeleton() {

  return (
    <li className={classes.root}>
      <Skeleton width={48} height={48} circle/>

      <div className={classes.content}>
        <div className={classes.info}>
          <h4 className={classes.title}>
            <Skeleton width={180}/>
          </h4>
          <p className={classes.lastMessage}>
            <Skeleton width="100%"/>
          </p>
        </div>
      </div>
    </li>
  );
}