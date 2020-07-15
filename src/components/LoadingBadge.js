import React from "react";
import Badge from "react-bootstrap/Badge";

const LoadingBadge = ({
  allDataLength,
  newDataLength,
  newDataCopy,
  inProgressDataLength,
  inProgressCopy,
  readyDataLength,
  readyDataCopy,
}) => {
  return (
    <>
      {allDataLength ? (
        <>
          <Badge pill variant="light" className="margin-right-5">
            {allDataLength} TOTALT
          </Badge>
          {newDataLength ? (
            <Badge
              className="margin-right-5"
              pill
              variant={newDataLength ? "danger" : "success"}
            >
              {`${newDataLength}  ${
                newDataCopy ? newDataCopy : newDataLength > 1 ? "NYA" : "NY"
              }`}
            </Badge>
          ) : null}
          {inProgressDataLength ? (
            <Badge className="margin-right-5" pill variant={"warning"}>
              {inProgressDataLength} {inProgressCopy}
            </Badge>
          ) : null}
          {readyDataLength ? (
            <Badge pill variant={"success"}>
              {readyDataLength} {readyDataCopy}
            </Badge>
          ) : null}
        </>
      ) : (
        <Badge pill variant={"light"}>
          ...Laddar
        </Badge>
      )}
    </>
  );
};

export default LoadingBadge;
