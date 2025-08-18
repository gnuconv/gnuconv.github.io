import { Link, Typography } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import {
  clearCategories,
  setSelectedCategory,
} from "../redux/slices/selectedCategory";
import React from "react";

type BreadLinkProps = {
  label: string;
  onClick: () => void;
};

const BreadLink = ({ label, onClick }: BreadLinkProps): React.ReactElement => {
  return (
    <Link component="span" sx={{ cursor: "pointer" }} onClick={onClick}>
      {label}
    </Link>
  );
};

type BreadcrumbsProps = {
  categories: string[];
  amount: number;
};

export const Breadcrumbs = ({
  categories,
  amount,
}: BreadcrumbsProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const elems: React.ReactElement[] = [
    <BreadLink
      key={"init"}
      onClick={() => dispatch(clearCategories())}
      label={"Expenses"}
    />,
  ];

  for (let i = 0; i < categories.length; i++) {
    elems.push(<React.Fragment key={`F${i}`}>{" > "}</React.Fragment>);
    elems.push(
      <BreadLink
        key={`L${i}`}
        label={categories[i]}
        onClick={() =>
          dispatch(setSelectedCategory(categories.slice(0, i + 1)))
        }
      />
    );
  }
  return (
    <Typography variant="h3">
      {elems}: ${amount.toFixed(2)}
    </Typography>
  );
};
