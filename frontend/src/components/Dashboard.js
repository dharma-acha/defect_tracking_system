import { Card, Col, Row, Container } from "react-bootstrap";
import TopNav from "./TopNav";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import "./dashboard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [recentusers, setRecentUsers] = useState([]);
  const [recentbugs, setRecentBugs] = useState([]);
  const [recentempbugs, setRecentEmpBugs] = useState([]);
  const [recentprojectbugs, setRecentProjectBugs] = useState([]);
  const [myteam, setMyTeam] = useState([]);
  const [recent, setRecent] = useState([]);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({ projecttitle: "" });
  const [bugs, setBugs] = useState([]);
  const [usercount, setUserCount] = useState("");
  const [projectcount, setProjectCount] = useState("");
  const [bugcount, setBugCount] = useState("");
  const [openbugcount, setOpenBugCount] = useState("");
  const [totalprojectbugs, setTotalProjectBugs] = useState("");
  const [projectopenbugs, setProjectOpenBugs] = useState("");
  const [userempty, setUserEmpty] = useState(false);
  const [bugempty, setBugEmpty] = useState(false);
  const [teamempty, setTeamEmpty] = useState(false);
  const [projectbugempty, setProjectBugEmpty] = useState(false);
  const [empbugempty, setEmpBugEmpty] = useState(false);
  const [empopenbugs, setEmpOpenBugs] = useState("");

  const [empclosedbugs, setEmpClosedBugs] = useState("");

  const getrecentusers = (length) => {
    dispatch({ type: "SETSPINNER", data: { display: true } });
    axios
      .get(`${config.BE_SERVER_URL}users/getrecent/${length}`)
      .then((res) => {
        if (res.data.success) {
          setRecentUsers(res.data.recentusers);
          if (res.data.empty) {
            setUserEmpty(true);
          }
          dispatch({ type: "SETSPINNER", data: { display: false } });
        } else {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        toast.warning(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 3000,
        });
      });
  };

  const getrecentbugs = (length) => {
    dispatch({ type: "SETSPINNER", data: { display: true } });
    axios
      .get(`${config.BE_SERVER_URL}bugs/getrecent/${length}`)
      .then((res) => {
        if (res.data.success) {
          setRecentBugs(res.data.recentbugs);
          if (res.data.empty) {
            setBugEmpty(true);
          }
          dispatch({ type: "SETSPINNER", data: { display: false } });
        } else {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        toast.warning(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 3000,
        });
      });
  };

  const gettotalusers = () => {
    dispatch({ type: "SETSPINNER", data: { display: true } });
    axios
      .get(`${config.BE_SERVER_URL}users/totalusers`)
      .then((res) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        if (res.data.success) {
          setUserCount(res.data.count);
        } else {
          setUserCount(res.data.count);
          toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        toast.warning(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 3000,
        });
      });
  };

  const getprojectcount = () => {
    dispatch({ type: "SETSPINNER", data: { display: true } });
    axios
      .get(`${config.BE_SERVER_URL}projects/totalprojects`)
      .then((res) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        if (res.data.success) {
          setProjectCount(res.data.count);
        } else {
          setProjectCount(res.data.count);
          toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        toast.warning(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 3000,
        });
      });
  };

  const getbugcount = () => {
    dispatch({ type: "SETSPINNER", data: { display: true } });
    axios
      .get(`${config.BE_SERVER_URL}bugs/totalbugs`)
      .then((res) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        if (res.data.success) {
          setBugCount(res.data.count);
        } else {
          setBugCount(res.data.count);
          toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        toast.warning(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 3000,
        });
      });
  };

  const getopenbugcount = () => {
    dispatch({ type: "SETSPINNER", data: { display: true } });
    axios
      .get(`${config.BE_SERVER_URL}bugs/totalopenbugs`)
      .then((res) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        if (res.data.success) {
          setOpenBugCount(res.data.count);
        } else {
          setOpenBugCount(res.data.count);
          toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        toast.warning(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 3000,
        });
      });
  };

  const getteam = () => {
    if (!authToken.project) {
      setTeamEmpty(true);
      setMyTeam([]);
    } else {
      dispatch({ type: "SETSPINNER", data: { display: true } });
      axios
        .get(
          `${config.BE_SERVER_URL}users/projectemployees/${authToken.project}`
        )
        .then((res) => {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          if (res.data.success) {
            setMyTeam(res.data.employees);
          } else {
            setMyTeam([]);
            if (res.data.empty) {
              setTeamEmpty(true);
            }
            toast.warning(res.data.dashboardmsg, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
          }
        });
    }
  };

  const getproject = () => {
    if (!authToken.project) {
      setProject({ projecttitle: "" });
    } else {
      dispatch({ type: "SETSPINNER", data: { display: true } });
      axios
        .get(`${config.BE_SERVER_URL}projects/${authToken.project}`)
        .then((res) => {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          if (res.data.success) {
            setProject(res.data.record);
          } else {
            setProject({ projecttitle: "" });
          }
        });
    }
  };

  const gettotalprojectbugs = () => {
    if (!authToken.project) {
      setTotalProjectBugs(0);
    } else {
      dispatch({ type: "SETSPINNER", data: { display: true } });
      axios
        .get(`${config.BE_SERVER_URL}bugs/totalbugs/${authToken.project}`)
        .then((res) => {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          if (res.data.success) {
            setTotalProjectBugs(res.data.count);
          } else {
            setTotalProjectBugs(res.data.count);
            toast.warning(res.data.message, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
          }
        });
    }
  };

  const getprojectopenbugs = () => {
    if (!authToken.project) {
      setProjectOpenBugs(0);
    } else {
      dispatch({ type: "SETSPINNER", data: { display: true } });
      axios
        .get(`${config.BE_SERVER_URL}bugs/totalopenbugs/${authToken.project}`)
        .then((res) => {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          if (res.data.success) {
            setProjectOpenBugs(res.data.count);
          } else {
            setProjectOpenBugs(res.data.count);
            toast.warning(res.data.message, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
          }
        });
    }
  };
  const getrecentprojectbugs = (length) => {
    if (!authToken.project) {
      setRecentProjectBugs([]);
      setProjectBugEmpty(true);
    }
    dispatch({ type: "SETSPINNER", data: { display: true } });
    axios
      .get(
        `${config.BE_SERVER_URL}bugs/getrecentprojectbugs/${authToken.project}/${length}`
      )
      .then((res) => {
        if (res.data.success) {
          setRecentProjectBugs(res.data.recentbugs);
          if (res.data.empty) {
            setProjectBugEmpty(true);
          }
          dispatch({ type: "SETSPINNER", data: { display: false } });
        } else {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        toast.warning(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 3000,
        });
      });
  };

  const getempbugs = (length) => {
    dispatch({ type: "SETSPINNER", data: { display: true } });
    axios
      .get(`${config.BE_SERVER_URL}bugs/getempbugs/${authToken._id}/${length}`)
      .then((res) => {
        if (res.data.success) {
          setRecentEmpBugs(res.data.recentbugs);
          if (res.data.empty) {
            setEmpBugEmpty(true);
          }
          dispatch({ type: "SETSPINNER", data: { display: false } });
        } else {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SETSPINNER", data: { display: false } });
        toast.warning(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 3000,
        });
      });
  };

  const getempopenbug = () => {
    if (!authToken.project) {
      setEmpOpenBugs(0);
    } else {
      dispatch({ type: "SETSPINNER", data: { display: true } });
      axios
        .get(`${config.BE_SERVER_URL}bugs/empopenbugs/${authToken._id}`)
        .then((res) => {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          if (res.data.success) {
            setEmpOpenBugs(res.data.count);
          } else {
            setEmpOpenBugs(res.data.count);
            toast.warning(res.data.message, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
          }
        });
    }
  };

  const getempclosedbug = () => {
    if (!authToken.project) {
      setEmpClosedBugs(0);
    } else {
      dispatch({ type: "SETSPINNER", data: { display: true } });
      axios
        .get(`${config.BE_SERVER_URL}bugs/empclosedbugs/${authToken._id}`)
        .then((res) => {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          if (res.data.success) {
            setEmpClosedBugs(res.data.count);
          } else {
            setEmpClosedBugs(res.data.count);
            toast.warning(res.data.message, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
          }
        });
    }
  };
  const dispatch = useDispatch();

  const selectauthToken = (rootstate) => rootstate.authToken;
  const authToken = useSelector(selectauthToken);

  useEffect(() => {
    if (authToken.role === "ADMIN") {
      gettotalusers();
      getprojectcount();
      getbugcount();
      getopenbugcount();
      getrecentusers(config.USERS_TABLE_LENGTH);
      getrecentbugs(config.BUGS_TABLE_LENGTH);
    }
    if (authToken.role === "PROJECTMANAGER") {
      getteam();
      getproject();
      gettotalprojectbugs();
      getprojectopenbugs();
      getrecentprojectbugs(config.BUGS_TABLE_LENGTH);
    }
    if (authToken.role === "EMPLOYEE") {
      getempbugs(config.BUGS_TABLE_LENGTH);
      getproject();
      getempopenbug();
      getempclosedbug();
    }
  }, [authToken]);

  if (authToken.role === "ADMIN") {
    return (
      <>
        <TopNav />
        <Container fluid="lg">
          <Row className="mt-5">
            <Col md={3} sm={6} className="mb-3">
              <Link
                to="/users"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row className="card-content">
                      <Col xs={4}>
                        <i className=" card-icon bi bi-people-fill"></i>
                      </Col>
                      <Col xs={8}>
                        <Card.Title>Total Users</Card.Title>
                        <Card.Text>
                          <h5>{usercount}</h5>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Link>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Link
                to="/projects"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row className="card-content">
                      <Col xs={4}>
                        <i className=" card-icon bi bi-journal-code"></i>
                      </Col>
                      <Col xs={8}>
                        <Card.Title>Total Projects</Card.Title>
                        <Card.Text>
                          <h5>{projectcount}</h5>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Link>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Link
                to="/defects"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row className="card-content">
                      <Col xs={4}>
                        <i className=" card-icon bi bi-bug-fill"></i>
                      </Col>
                      <Col xs={8}>
                        <Card.Title>Total Bugs</Card.Title>
                        <Card.Text>
                          <h5>{bugcount}</h5>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Link>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Link
                to="/defects"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row className="card-content">
                      <Col xs={4}>
                        <i className=" card-icon bi bi-bug"></i>
                      </Col>
                      <Col xs={8}>
                        <Card.Title>Open Bugs</Card.Title>
                        <Card.Text>
                          <h5>{openbugcount}</h5>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xs={6} sm={4}>
              <h3>Recent Users</h3>
            </Col>
            <Col
              xs={{ span: 4, offset: 2 }}
              md={{ span: 2, offset: 6 }}
              sm={{ span: 3, offset: 5 }}
            >
              <Link to="/users">
                <button
                  style={{ backgroundColor: "slateblue", width: "100%" }}
                  className="btn btn-primary"
                >
                  View All
                </button>
              </Link>
            </Col>
          </Row>

          <Row className="mt-3 p-2">
            <Col className="table-responsive p-0">
              {userempty && (
                <h5 className="text-center">
                  <b>No Users Exists</b>
                </h5>
              )}
              {!userempty && (
                <table style={{ minWidth: "768px" }}>
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentusers.map((json) => (
                      <tr>
                        <td title={json._id}>...{json._id.slice(18)}</td>
                        <td>{json.username}</td>
                        <td>{json.role}</td>
                        <td>
                          {new Date(json.createdAt).toLocaleString(
                            config.DATE_REGION,
                            config["DATE_FORMAT_OBJECT"]
                          )}
                        </td>
                        <td>
                          {new Date(json.updatedAt).toLocaleString(
                            config.DATE_REGION,
                            config["DATE_FORMAT_OBJECT"]
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xs={6} sm={4}>
              <h3>Recent Bugs</h3>
            </Col>
            <Col
              xs={{ span: 4, offset: 2 }}
              md={{ span: 2, offset: 6 }}
              sm={{ span: 3, offset: 5 }}
            >
              <Link to="/reports">
                <button
                  style={{ backgroundColor: "slateblue", width: "100%" }}
                  className="btn btn-primary"
                >
                  View All
                </button>
              </Link>
            </Col>
          </Row>

          <Row className="mt-3 p-2">
            <Col className="table-responsive p-0">
              {bugempty && (
                <h5 className="text-center">
                  <b>No Bugs Exist</b>
                </h5>
              )}
              {!bugempty && (
                <table style={{ minWidth: "768px" }}>
                  <thead>
                    <tr>
                      <th>Bug</th>
                      <th>Description</th>
                      <th>Project</th>
                      <th>Created</th>
                      <th>Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentbugs.map((bug) => {
                      return (
                        <tr>
                          <td title={bug.bugsummary}>
                            {bug.bugsummary.length < 15
                              ? bug.bugsummary
                              : bug.bugsummary.slice(0, 12) + "..."}
                          </td>
                          <td title={bug.bugdescription}>
                            {bug.bugdescription.length < 15
                              ? bug.bugdescription
                              : bug.bugdescription.slice(0, 12) + "..."}
                          </td>
                          <td title={bug.bugproject}>
                            {bug.bugproject.length < 25
                              ? bug.bugproject
                              : bug.bugproject.slice(0, 12) + "..."}
                          </td>
                          <td>
                            {new Date(bug.createdAt).toLocaleString(
                              config.DATE_REGION,
                              config["DATE_FORMAT_OBJECT"]
                            )}
                          </td>
                          <td>
                            {new Date(bug.updatedAt).toLocaleString(
                              config.DATE_REGION,
                              config["DATE_FORMAT_OBJECT"]
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (authToken.role === "PROJECTMANAGER") {
    return (
      <>
        <TopNav />
        <Container fluid="lg">
          <Row className="mt-5">
            <Col md={3} sm={6} className="mb-3">
              <a
                href="#myteamtable"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row className="card-content">
                      <Col xs={4}>
                        <i className="card-icon bi bi-people-fill"></i>
                      </Col>
                      <Col xs={8}>
                        <Card.Title>Total Team</Card.Title>
                        <Card.Text>
                          <h5>{myteam.length}</h5>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </a>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <a style={{ textDecoration: "none", color: "black" }}>
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row className="card-content">
                      <Col xs={4}>
                        <i className="card-icon bi bi-journal-code"></i>
                      </Col>
                      <Col xs={8}>
                        <Card.Title>My Project</Card.Title>
                        <Card.Text>
                          {project.projecttitle ? (
                            <h5
                              title={`${project.projecttitle}--${project.startdate} to ${project.enddate}`}
                            >
                              <small>
                                '
                                {project.projecttitle < 15
                                  ? project.projecttitle
                                  : project.projecttitle.slice(0, 11) + "..."}
                                '
                              </small>
                            </h5>
                          ) : (
                            <h5>
                              <small>'Unassigned'</small>
                            </h5>
                          )}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </a>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Link
                to="/defects"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row className="card-content">
                      <Col xs={4}>
                        <i className="card-icon bi bi-bug-fill"></i>
                      </Col>
                      <Col xs={8}>
                        <Card.Title>Total Bugs</Card.Title>
                        <Card.Text>
                          <h5>{totalprojectbugs}</h5>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Link>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Link
                to="/defects"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row className="card-content">
                      <Col xs={4}>
                        <i className="card-icon bi bi-bug"></i>
                      </Col>
                      <Col xs={8}>
                        <Card.Title>Open Bugs</Card.Title>
                        <Card.Text>
                          <h5>{projectopenbugs}</h5>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xs={6} sm={4}>
              <h3>Recent Bugs</h3>
            </Col>
            <Col
              xs={{ span: 4, offset: 2 }}
              md={{ span: 2, offset: 6 }}
              sm={{ span: 3, offset: 5 }}
            >
              <Link to="/reports">
                <button
                  style={{ backgroundColor: "slateblue", width: "100%" }}
                  className="btn btn-primary"
                >
                  View All
                </button>
              </Link>
            </Col>
          </Row>

          <Row className="mt-3 p-2">
            <Col className="table-responsive p-0">
              {projectbugempty && (
                <h5 className="text-center">
                  <b>No Bugs! All clear at present</b>
                </h5>
              )}
              {!projectbugempty && (
                <table style={{ minWidth: "768px" }}>
                  <thead>
                    <tr>
                      <th>Bug</th>
                      <th>Description</th>
                      <th>Project</th>
                      <th>Created</th>
                      <th>Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentprojectbugs.map((bug) => {
                      return (
                        <tr>
                          <td title={bug.bugsummary}>
                            {bug.bugsummary.length < 15
                              ? bug.bugsummary
                              : bug.bugsummary.slice(0, 12) + "..."}
                          </td>
                          <td title={bug.bugdescription}>
                            {bug.bugdescription.length < 15
                              ? bug.bugdescription
                              : bug.bugdescription.slice(0, 12) + "..."}
                          </td>
                          <td title={project.projecttitle}>
                            {project.projecttitle < 25
                              ? project.projecttitle
                              : project.projecttitle.slice(0, 21) + "..."}
                          </td>
                          <td>
                            {new Date(bug.createdAt).toLocaleString(
                              config.DATE_REGION,
                              config["DATE_FORMAT_OBJECT"]
                            )}
                          </td>
                          <td>
                            {new Date(bug.updatedAt).toLocaleString(
                              config.DATE_REGION,
                              config["DATE_FORMAT_OBJECT"]
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xs={6} sm={4}>
              <h3>My Team</h3>
            </Col>
          </Row>

          <Row id="myteamtable" className="mt-3 p-2">
            <Col className="table-responsive p-0">
              {teamempty && (
                <h5 className="text-center">
                  <b>No Employee working under the project</b>
                </h5>
              )}
              {!teamempty && (
                <table style={{ minWidth: "768px" }}>
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Created</th>
                      <th>Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myteam.map((json) => (
                      <tr>
                        <td>{json._id}</td>
                        <td>{json.username}</td>
                        <td>{json.email}</td>
                        <td>
                          {new Date(json.createdAt).toLocaleString(
                            config.DATE_REGION,
                            config["DATE_FORMAT_OBJECT"]
                          )}
                        </td>
                        <td>
                          {new Date(json.updatedAt).toLocaleString(
                            config.DATE_REGION,
                            config["DATE_FORMAT_OBJECT"]
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (authToken.role === "EMPLOYEE") {
    return (
      <>
        <TopNav />
        <Container fluid="lg">
          <Row className="mt-5">
            <Col sm={4} md={4} lg={3}>
              <Link
                to="/reports"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Card
                  style={{
                    border: "1px solid slateblue",
                    boxShadow: "3px 6px 6px slateblue",
                  }}
                >
                  <Card.Body>
                    <Row>
                      <Col sm={6}>
                        <i
                          style={{ fontSize: "300%" }}
                          class="bi bi-box-seam"
                        ></i>
                      </Col>
                      <Col sm={6}>
                        <Card.Title>My Total Bugs</Card.Title>
                        <Card.Text>
                          <h5>{recentempbugs.length}</h5>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Link>
            </Col>

            <Col sm={4} md={{ span: 3, offset: 1 }}>
              <Card
                style={{
                  border: "1px solid slateblue",
                  boxShadow: "3px 6px 6px slateblue",
                }}
              >
                <Card.Body>
                  <Row>
                    <Col sm={6}>
                      <i style={{ fontSize: "300%" }} class="bi bi-bug"></i>
                    </Col>
                    <Col sm={6}>
                      <Card.Title>Total Open</Card.Title>
                      <Card.Text>
                        <h5>{empopenbugs}</h5>
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4} md={{ span: 3, offset: 1 }}>
              <Card
                style={{
                  border: "1px solid slateblue",
                  boxShadow: "3px 6px 6px slateblue",
                }}
              >
                <Card.Body>
                  <Row>
                    <Col sm={6}>
                      <i
                        style={{ fontSize: "300%" }}
                        class="bi bi-bug-fill"
                      ></i>
                    </Col>
                    <Col sm={6}>
                      <Card.Title>Total Closed</Card.Title>
                      <Card.Text>
                        <h5>{empclosedbugs}</h5>
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xs={6} sm={4}>
              <h3>My Bugs</h3>
            </Col>
            <Col
              xs={{ span: 4, offset: 2 }}
              md={{ span: 2, offset: 6 }}
              sm={{ span: 3, offset: 5 }}
            >
              <Link to="/reports">
                <button
                  style={{ backgroundColor: "slateblue", width: "100%" }}
                  className="btn btn-primary"
                >
                  View All
                </button>
              </Link>
            </Col>
          </Row>

          <Row className="mt-3 p-2">
            <Col className="table-responsive p-0">
              {empbugempty && (
                <h5 className="text-center">
                  <b>No bugs assigned!</b>
                </h5>
              )}
              {!empbugempty && (
                <table>
                  <thead>
                    <tr>
                      <th>Bug</th>
                      <th>Description</th>
                      <th>Project</th>
                      <th>Created</th>
                      <th>Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentempbugs.map((bug) => {
                      return (
                        <tr>
                          <td title={bug.bugsummary}>
                            {bug.bugsummary.length < 15
                              ? bug.bugsummary
                              : bug.bugsummary.slice(0, 12) + "..."}
                          </td>
                          <td title={bug.bugdescription}>
                            {bug.bugdescription.length < 15
                              ? bug.bugdescription
                              : bug.bugdescription.slice(0, 12) + "..."}
                          </td>
                          <td title={project.projecttitle}>
                            {project.projecttitle.length < 25
                              ? project.projecttitle
                              : project.projecttitle.slice(0, 21) + "..."}
                          </td>
                          <td>
                            {new Date(bug.createdAt).toLocaleString(
                              config.DATE_REGION,
                              config["DATE_FORMAT_OBJECT"]
                            )}
                          </td>
                          <td>
                            {new Date(bug.updatedAt).toLocaleString(
                              config.DATE_REGION,
                              config["DATE_FORMAT_OBJECT"]
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <LoginHeader />
      <LoginForm />
    </>
  );
}
export default Dashboard;
