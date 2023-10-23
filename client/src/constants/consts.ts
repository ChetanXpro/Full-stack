export const Routes = {
  HOME: "/",
  LOGIN: "/signin",
  REGISTER: "/signup",
  PROFILE: "/profile",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
  VERIFY_EMAIL_SUCCESS: "/verify-email/success",
  VERIFY_EMAIL_FAILURE: "/verify-email/failure",
  VERIFY_EMAIL_PENDING: "/verify-email/pending",
  VERIFY_EMAIL_PENDING_SUCCESS: "/verify-email/pending/success",
  VERIFY_EMAIL_PENDING_FAILURE: "/verify-email/pending/failure",
  VERIFY_EMAIL_PENDING_RESEND: "/verify-email/pending/resend",
  VERIFY_EMAIL_PENDING_RESEND_SUCCESS: "/verify-email/pending/resend/success",
  VERIFY_EMAIL_PENDING_RESEND_FAILURE: "/verify-email/pending/resend/failure",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT: "/verify-email/pending/resend/limit",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_SUCCESS:
    "/verify-email/pending/resend/limit/success",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_FAILURE:
    "/verify-email/pending/resend/limit/failure",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED:
    "/verify-email/pending/resend/limit/reached",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_SUCCESS:
    "/verify-email/pending/resend/limit/reached/success",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_FAILURE:
    "/verify-email/pending/resend/limit/reached/failure",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_RESEND:
    "/verify-email/pending/resend/limit/reached/resend",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_RESEND_SUCCESS:
    "/verify-email/pending/resend/limit/reached/resend/success",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_RESEND_FAILURE:
    "/verify-email/pending/resend/limit/reached/resend/failure",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_RESEND_LIMIT:
    "/verify-email/pending/resend/limit/reached/resend/limit",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_RESEND_LIMIT_SUCCESS:
    "/verify-email/pending/resend/limit/reached/resend/limit/success",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_RESEND_LIMIT_FAILURE:
    "/verify-email/pending/resend/limit/reached/resend/limit/failure",
  VERIFY_EMAIL_PENDING_RESEND_LIMIT_REACHED_RESEND_LIMIT_REACHED:
    "/verify-email/pending/resend/limit/reached/resend/limit",
};

export const TaskEnum = {
  PENDING: "pending",
  INPROGRESS: "inprogress",
  COMPLETED: "completed",
};

export const TaskPriorityEnum = {
  Critical: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export const TaskStatusList = [
  { value: TaskEnum.PENDING, label: "Pending" },
  { value: TaskEnum.INPROGRESS, label: "In Progress" },
  { value: TaskEnum.COMPLETED, label: "Completed" },
];
export const TaskStatusMap = {
  [TaskEnum.PENDING]: "Pending",
  [TaskEnum.INPROGRESS]: "In Progress",
  [TaskEnum.COMPLETED]: "Completed",
};

export const TaskPriorityList = [
  { value: TaskPriorityEnum.Critical, label: "Critical" },
  { value: TaskPriorityEnum.HIGH, label: "High" },
  {
    value: TaskPriorityEnum.MEDIUM,
    label: "Medium",
  },
  { value: TaskPriorityEnum.LOW, label: "Low" },
];

export const TaskPriorityMap = {
  [TaskPriorityEnum.Critical]: "Critical",
  [TaskPriorityEnum.HIGH]: "High",
  [TaskPriorityEnum.MEDIUM]: "Medium",
  [TaskPriorityEnum.LOW]: "Low",
};
