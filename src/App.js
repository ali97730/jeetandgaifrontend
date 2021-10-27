import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
// import FallbackScreen from './FallbackScreen';
import Home from './components/screens/Home';
const PrivateScreen =  lazy(()=>import("./components/screens/PrivateScreen"));

const LoginScreen = lazy(()=>import("./components/screens/LoginScreen"));
const StudentLoginScreen = lazy(()=>import("./components/screens/StudentLoginScreen"));
const StudentRegisterScreen = lazy(()=>import("./components/screens/StudentRegisterScreen"));
const StudentPrivateScreen = lazy(()=>import("./components/screens/StudentPrivateScreen"));
const RegisterScreen = lazy(()=>import("./components/screens/RegisterScreen"));
const ForgotPasswordScreen = lazy(()=>import("./components/screens/ForgotPasswordScreen"));
const ResetPasswordScreen = lazy(()=>import("./components/screens/ResetPasswordScreen"));
const Card = lazy(()=>import("./components/screens/Card"));


const App = () => {
  return (
    <Router>
      <Suspense  fallback={"<div>hiiiiii</div>"} className="app">
        <Switch>
          <PrivateRoute exact path="/facultydetails/:user_id" component={PrivateScreen} />
          <PrivateRoute exact path="/facultydetails/qr/:user_id" component={Card} />
          {/* <PrivateRoute exact path="/" component={LoginScreen} /> */}
          <Route exact path="/studentlogin" component={StudentLoginScreen} />
          <Route exact path="/studentregister" component={StudentRegisterScreen} />
          <Route exact path="/scanqr/:user_id" component={StudentPrivateScreen} />
          {/* this need to change for student */}
          <Route exact path="/facultylogin" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
          <Route path="/" component={Home}/>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
