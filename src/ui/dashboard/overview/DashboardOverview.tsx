import { DashboardSubpageHeader } from "../../components/DashboardHeader";
import { DashboardSubpageContainer } from "../../components/DashboardContainer";
import { useDashboardViewModel } from "../../../viewmodel/Dashboard";
import { Fragment, useEffect } from "react";
import { Card, notification, Statistic, Typography } from "antd";
import { AppLoader } from "../../components/AppLoader";
import { EmptyData } from "../../components/Empty";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DashboardOverviewPage = () => {
  const {
    fetchOverview,
    fetchOverviewState,
    onFetchOverviewStateReceived,
    overviewData,
  } = useDashboardViewModel();

  useEffect(() => {
    void fetchOverview();
  }, []);

  useEffect(() => {
    if (!!fetchOverviewState && !fetchOverviewState.loading) {
      if (fetchOverviewState.hasError) {
        notification.error({
          message: "Error",
          description:
            "Ocurrió un error al obtener los datos de la vista general",
        });
        console.log(fetchOverviewState.error);
      } else {
        console.log(overviewData);
      }
      onFetchOverviewStateReceived();
    }
  }, [fetchOverviewState]);

  return (
    <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
      <AppLoader loading={!!fetchOverviewState && fetchOverviewState.loading} />
      <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>
        {overviewData ? (
          <div
            className={
              "w-full h-fit gap-2 flex flex-row flex-wrap overflow-x-hidden"
            }
          >
            {overviewData.map((item, index) => {
              return (
                <Fragment key={item.title}>
                  {item.data.map((dataItem, dataIndex) => (
                    <Card className={"grow"} key={`${index}-${dataIndex}`}>
                      <Statistic
                        prefix={
                          dataItem.difference ? (
                            dataItem.difference > 0 ? (
                              <FontAwesomeIcon icon={faArrowUp} />
                            ) : dataItem.difference < 0 ? (
                              <FontAwesomeIcon icon={faArrowDown} />
                            ) : null
                          ) : null
                        }
                        valueStyle={{
                          color: dataItem.difference
                            ? dataItem.difference > 0
                              ? "#3f8600"
                              : dataItem.difference < 0
                              ? "#cf1322"
                              : "inherit"
                            : "inherit",
                        }}
                        title={item.title + " " + dataItem.title}
                        value={dataItem.count}
                      />
                    </Card>
                  ))}
                </Fragment>
              );
            })}
          </div>
        ) : (
          <EmptyData description={"No hay datos para mostrar"} />
        )}
      </div>
    </DashboardSubpageContainer>
  );
};
