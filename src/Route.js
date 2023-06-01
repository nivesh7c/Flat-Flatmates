import { Redirect, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EditProperty from "./pages/Dashboard/EditProperty";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import ListFlatmates from "./pages/ListFlatmates";
import ListingOption from "./pages/ListingOption";
import ListPgHostel from "./pages/ListPgHostel";
import ListRentalProperty from "./pages/ListRentalProperty";
import PropertyView from "./pages/PropertyView";
import HomeRental from "./pages/Landing/rental";
import HomePgHostel from "./pages/Landing/pghostel";
import HomeFlatmates from "./pages/Landing/flatmates";
import Listing from "./pages/Listing";
import DetailPage from "./pages/DetailPage";
import MyShortlists from "./pages/MyShortlists";
import StaticPages from "./pages/StaticPages";
import Chat from "./pages/Chat";

export default function AppRoute() {
  const ProtectedComponent = ({ children }) => {
    if (!localStorage?.getItem("token")) {
      return <Redirect to="/continue" />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Landing} />
      <Route exact path="/home/rental">
        <HomeRental showCity={true} />
      </Route>
      <Route exact path="/home/pghostel">
        <HomePgHostel showCity={true} />
      </Route>
      <Route exact path="/home/flatmates">
        <HomeFlatmates showCity={true} />
      </Route>

      <Route exact path="/continue">
        <Home step={localStorage?.getItem("token") ? 5 : 1} />
      </Route>
      <Route exact path="/choose-your-preference">
        <Home step={5} />
      </Route>
      <Route exact path="/listing-option">
        <ProtectedComponent>
          <ListingOption />
        </ProtectedComponent>
      </Route>
      <Route exact path="/list-flatmates">
        <ProtectedComponent>
          <ListFlatmates />
        </ProtectedComponent>
      </Route>
      <Route exact path="/list-pg-hostel">
        <ProtectedComponent>
          <ListPgHostel />
        </ProtectedComponent>
      </Route>
      <Route exact path="/owner-dashboard">
        <ProtectedComponent>
          <Dashboard />
        </ProtectedComponent>
      </Route>
      <Route exact path="/list-rental-property">
        <ProtectedComponent>
          <ListRentalProperty />
        </ProtectedComponent>
      </Route>
      <Route exact path="/edit-profile">
        <ProtectedComponent>
          <EditProfile />
        </ProtectedComponent>
      </Route>
      <Route exact path="/edit-property">
        <ProtectedComponent>
          <EditProperty />
        </ProtectedComponent>
      </Route>
      <Route exact path="/chat-with-owner">
        <ProtectedComponent>
          <Chat />
        </ProtectedComponent>
      </Route>
      <Route exact path="/chat-room">
        <ProtectedComponent>
          <Chat isOwner={true}/>
        </ProtectedComponent>
      </Route>
      {/* <Route exact path="/chat-box" component={Chat} /> */}
      <Route exact path="/property-view" component={PropertyView} />
      <Route exact path="/listing/rental">
        <Listing type={"rental"} showCity={true} />
      </Route>
      <Route exact path="/my-shortlist">
        <ProtectedComponent>
          <MyShortlists />
        </ProtectedComponent>
      </Route>
      <Route exact path="/listing/pghostel">
        <Listing type={"pghostel"} showCity={true} />
      </Route>
      <Route exact path="/listing/flatmates">
        <Listing type={"flatmates"} showCity={true} />
      </Route>
      <Route exact path="/detail/rental/:city/:propertyId">
        <DetailPage type={"rental"} />
      </Route>
      <Route exact path="/detail/pghostel/:city/:propertyId">
        <DetailPage type={"pghostel"} />
      </Route>
      <Route exact path="/detail/flatmates/:city/:propertyId">
        <DetailPage type={"flatmates"} />
      </Route>
      
      <Route exact path="/:token" component={StaticPages} />
    </>
  );
}
