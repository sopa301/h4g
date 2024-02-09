const express = require("express");
const {
  POSTMakeQrCode,
  POSTGetQrCode,
  POSTAttend,
  POSTGetAttendance,
  POSTUpdateHours,
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/makeQrCode", POSTMakeQrCode);

router.post("/getQrCode", POSTGetQrCode);

router.post("/attend", POSTAttend);

router.post("/getAttendance", POSTGetAttendance);

router.post("/updateHours", POSTUpdateHours);

module.exports = router;
