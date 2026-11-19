import { searchCollection } from "../search";

const getNewGuidesFromTypesense = async () => {
  const sortFields = [
    "rating:asc",
    "rating:desc",
    "ratingScore:asc",
    "ratingScore:desc",
    "createdAt:asc",
    "createdAt:desc",
    "lastVisit:asc",
    "lastVisit:desc",
    "uid:asc",
    "uid:desc",
    "fee.fullDay:asc",
    "fee.fullDay:desc",
    "fee.halfDay:asc",
    "fee.halfDay:desc",
    "firstname:asc",
    "lastname:asc",
    "firstname:desc",
    "lastname:desc",
    "maxPeople:asc",
    "maxPeople:desc",
  ];
  const sort_by = sortFields[Math.floor(Math.random() * sortFields.length)];
  let searchParameters = {
    q: "",
    query_by: `guide`,
    filter_by: `guide:="true" && verified:="true"`,
    // filter_by: `guide:="true"`,
    sort_by,
    per_page: 10,
    page: 1,
    exclude_fields: "availability, states",
  };
  try {
    const data = searchCollection("users", searchParameters);
    const tempGuides = data.hits.filter(function (element) {
      return element?.document?.photos?.length > 0 || element?.document?.avatar !== "/img/avatar.png";
    });
    return tempGuides.sort(() => Math.random() - 0.5);
  } catch (err) {
    console.log(err);
  }
};
export default getNewGuidesFromTypesense;
