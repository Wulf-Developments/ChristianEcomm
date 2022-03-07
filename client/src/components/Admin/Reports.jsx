import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserReports } from "../../actions/Admin/getUserReports";
import { getMonthlySalesReport } from "../../actions/Admin/getMonthlySalesReport";
import Loader from "../Loader";
import formatDate from "../../utils/formatDate";
import appendLeadingZeroes from "../../utils/appendLeadingZeroes";
import "./Reports.css";

/**
 * @summary A screen to see different reports such as money earned vs expenses
 * @returns HTML/JSX
 */
const Reports = () => {
  // declaring utilities
  const dispatch = useDispatch();
  // App State
  const { userReport, orderReport, loading } = useSelector(
    (state) => state.reports
  );

  // date utility to help display the dates we are looking at
  const date = new Date();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  // component lifecycle
  useEffect(() => {
    dispatch(getUserReports());
    dispatch(getMonthlySalesReport());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid>
          <Row>
            <Col className="report-container" lg={6} md={12}>
              <h2 style={{ textAlign: "center" }}>Users</h2>
              <p>
                From:{" "}
                {`${appendLeadingZeroes(
                  date.getMonth()
                )}/01/${date.getFullYear()}`}{" "}
                / To: {formatDate(Date.now())}
              </p>
              <Row>
                <Col>
                  <p>Total Users: {userReport.total}</p>
                  <p>Over the past Month</p>
                  <div>
                    <p>
                      Last Month:{" "}
                      <h4 style={{ display: "inline" }}>
                        {userReport.lastMonth}
                      </h4>
                    </p>
                    <p>
                      This Month:{" "}
                      <h4 style={{ display: "inline" }}>
                        {userReport.thisMonth}
                      </h4>
                    </p>
                    <p style={{ display: "inline" }}>Percent Difference: </p>
                    <h4>
                      {userReport.percentNew > 0 ? (
                        <>
                          {userReport.percentNew}%{" "}
                          <i
                            class="fas fa-solid fa-angle-up"
                            style={{ color: "green" }}
                          />
                        </>
                      ) : (
                        <>
                          {userReport.percentNew}%{" "}
                          <i
                            className="fas fa-solid fa-angle-down"
                            style={{ color: "red" }}
                          />
                        </>
                      )}
                    </h4>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="report-container">
              <h2 style={{ textAlign: "center" }}>Orders</h2>
              <p>
                From:{" "}
                {`${appendLeadingZeroes(
                  date.getMonth()
                )}/01/${date.getFullYear()}`}{" "}
                / To: {formatDate(Date.now())}
              </p>
              <Row>
                <Col className="report-container">
                  <p>Over the past Month</p>
                  <div>
                    <p>
                      Last Month (Num of Sales): Orders:{" "}
                      <h4>{orderReport.lastMonth}</h4>| Total:{" "}
                      <h4>{formatter.format(orderReport.totalSalesLast)}</h4>
                    </p>
                    <p>
                      This Month (Num of Sales): Orders:{" "}
                      <h4>{orderReport.thisMonth}</h4>| Total:{" "}
                      <h4>{formatter.format(orderReport.totalSalesThis)}</h4>
                    </p>
                    <p style={{ display: "inline" }}>Percent Difference: </p>
                    <h4>
                      {orderReport.percentChange > 0 ? (
                        <>
                          {orderReport.percentChange}%{" "}
                          <i
                            class="fas fa-solid fa-angle-up"
                            style={{ color: "green" }}
                          />
                        </>
                      ) : (
                        <>
                          {orderReport.percentChange}%{" "}
                          <i
                            className="fas fa-solid fa-angle-down"
                            style={{ color: "red" }}
                          />
                        </>
                      )}
                    </h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Reports;
