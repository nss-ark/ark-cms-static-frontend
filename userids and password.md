Common Password for all mock logins: password

User IDs for each Portal:

    Data Principal (DP) Portal:

        User ID/Email: dp_user@ark.com

        Login Page: dp_portal/dp_login.html

        Dashboard URL (on successful login): dp_portal/dp_dashboard.html

        OTP: The DP login page has an OTP step, but the current main.js logic for the dp case doesn't explicitly require it to proceed if credentials match and no OTP input is active. To make it consistent with Admin/DPO, the JS could be updated to enforce it for DP too if desired. For now, it might log in directly after credentials or after OTP if the step is activated.

    Data Fiduciary Admin (DF Admin) Portal:

        User ID/Email: df_admin@fiduciary.com

        Login Page: df_admin_portal/df_admin_login.html

        Dashboard URL (on successful login): df_admin_portal/df_admin_dashboard.html

        OTP: Required. Use 123456 when prompted after entering the correct email and password.

    Data Fiduciary DPO (DF DPO) Portal:

        User ID/Email: df_dpo@fiduciary.com

        Login Page: df_dpo_portal/df_dpo_login.html

        Dashboard URL (on successful login): df_dpo_portal/df_dpo_dashboard.html

        OTP: Required. Use 123456 when prompted after entering the correct email and password.

    Data Fiduciary Operator (DF Operator) Portal:

        User ID/Email: df_operator@fiduciary.com

        Login Page: df_operator_portal/df_operator_login.html

        Dashboard URL (on successful login): df_operator_portal/df_operator_dashboard.html

        OTP: Not required by default for this role in the provided wireframes/logic. Login will proceed directly if credentials match.

    SuperAdmin Portal:

        User ID/Email: super_admin@ark.com

        Login Page: superadmin_portal/superadmin_login.html

        Dashboard URL (on successful login): superadmin_portal/superadmin_dashboard.html

        OTP: Required. Use 123456 when prompted after entering the correct email and password.