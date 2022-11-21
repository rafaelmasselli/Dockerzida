import "./styles.scss";

export function Loading() {
  return (
    <div className="box__loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
