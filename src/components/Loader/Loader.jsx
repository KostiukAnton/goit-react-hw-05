import css from "../Loader/Loader.module.css";
// import { Blocks } from "react-loader-spinner";
import GridLoader from "react-spinners/GridLoader";

export default function Loader({ loading }) {
  if (loading) {
    return (
      <GridLoader className={css.loader} color="#4f1ed0" size={30} />
      // <Blocks
      //   height="80"
      //   width="80"
      //   color="#4fa94d"
      //   ariaLabel="blocks-loading"
      //   wrapperStyle={{}}
      //   wrapperClass="blocks-wrapper"
      //   visible={true}
      // />
    );
  }
}
