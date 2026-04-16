import { memo} from "react";
import { Product } from "./Product";
// import { SuggestPost } from "../../../components/SuggestPost";
// import { getAllPost } from "../../../store/slice/postSlice";

export const Main = memo(({ data }) => {
  console.log(data);
  // const data = [
  //     {
  //         title: "Bán căn hộ dự án vinhome Ocean Park Gia Lâm",
  //         link_image: "",
  //         url_page: "",
  //         square: 50,
  //         width: 5,
  //         length: 10,
  //         direct: "Đông",
  //         price: 1.1,
  //         juridical: "Sổ đỏ",
  //         street: "Tạ Quang Bửu",
  //         ward: "Bách Khoa",
  //         district: "Hai Bà Trưng",
  //         province: "Hà Nội",
  //         bedroom: 1,
  //         bathroom: 1,
  //         floor: 1,
  //         kitchen: 1,
  //     },
  // ];

  // const data1 = [
  //   {
  //     title: "Bán căn hộ dự án vinhome Ocean Park Gia Lâm",
  //     link_image: "",
  //     url_page: "",
  //     square: 50,
  //     width: 5,
  //     length: 10,
  //     direct: "Đông",
  //     price: 1.1,
  //     juridical: "Sổ đỏ",
  //     street: "Tạ Quang Bửu",
  //     ward: "Bách Khoa",
  //     district: "Hai Bà Trưng",
  //     province: "Hà Nội",
  //     bedroom: 1,
  //     bathroom: 1,
  //     floor: 1,
  //     kitchen: 1,
  //   },
  //   {
  //     title: "Bán căn hộ dự án vinhome Ocean Park Gia Lâm",
  //     link_image: "",
  //     url_page: "",
  //     square: 50,
  //     width: 5,
  //     length: 10,
  //     direct: "Đông",
  //     price: 1.1,
  //     juridical: "Sổ đỏ",
  //     street: "Tạ Quang Bửu",
  //     ward: "Bách Khoa",
  //     district: "Hai Bà Trưng",
  //     province: "Hà Nội",
  //     bedroom: 1,
  //     bathroom: 1,
  //     floor: 1,
  //     kitchen: 1,
  //   },
  //   {
  //     title: "Bán căn hộ dự án vinhome Ocean Park Gia Lâm",
  //     link_image: "",
  //     url_page: "",
  //     square: 50,
  //     width: 5,
  //     length: 10,
  //     direct: "Đông",
  //     price: 1.1,
  //     juridical: "Sổ đỏ",
  //     street: "Tạ Quang Bửu",
  //     ward: "Bách Khoa",
  //     district: "Hai Bà Trưng",
  //     province: "Hà Nội",
  //     bedroom: 1,
  //     bathroom: 1,
  //     floor: 1,
  //     kitchen: 1,
  //   },
  // ];

  return (
    <div className="main">
      <div className="content-main">
        {/* {data1 && data1.map((item, index) => <Product item={item} key={index} />)} */}
        {data.map((item, index) => (
          <Product item={item} key={index} />
        ))}
      </div>
    </div>
  );
});
