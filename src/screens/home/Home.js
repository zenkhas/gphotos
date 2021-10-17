import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import Drawer, { DRAWER_WIDTH } from "./Drawer";
import MainHeader from "./MainHeader";
import { createUseStyles } from "react-jss";
import Photos from "../photos/Photos";
import { useHistory } from "react-router-dom";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const HomeContent = ({ tabIndex }) => {
  const ref = useRef(null);
  const styles = useStyles();

  if (tabIndex === 0) {
    return (
      <div ref={ref} className={styles.homeContent}>
        <Photos />
      </div>
    );
  }
  return <div className={styles.homeContent}>Empty</div>;
};

const Home = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const history = useHistory();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onDeletePress = () => setOpenDeleteConfirmDialog(true);

  const closeDeleteDialog = () => setOpenDeleteConfirmDialog(false);

  const onDeleteConfirm = () => {
    alert("Deleted!");
  };

  const onUploadClick = () => history.push("/upload");

  const onSearch = () => {};
  const onMenuChange = (index) => setTabIndex(index);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
      <MainHeader
        handleDrawerToggle={handleDrawerToggle}
        onDeletePress={onDeletePress}
        onUploadClick={onUploadClick}
        onSearch={onSearch}
      />
      <Drawer
        container={container}
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        onMenuChange={onMenuChange}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <HomeContent tabIndex={tabIndex} />
        <DeleteConfirmDialog
          open={openDeleteConfirmDialog}
          onClose={closeDeleteDialog}
          onConfirm={onDeleteConfirm}
        />
      </Box>
    </Box>
  );
};

const useStyles = createUseStyles({
  homeContent: {
    marginLeft: DRAWER_WIDTH,
  },
});

export default Home;
