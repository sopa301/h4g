const express = require("express");
const {
  POSTMakeQrCode,
  POSTGetQrCode,
  POSTAttend,
  POSTGetAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/makeQrCode", POSTMakeQrCode);

router.post("/getQrCode", POSTGetQrCode);

router.post("/attend", POSTAttend);

router.post("/getAttendance", POSTGetAttendance);

module.exports = router;
