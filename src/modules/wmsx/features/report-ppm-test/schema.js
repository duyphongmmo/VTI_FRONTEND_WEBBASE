import * as Yup from "yup";

export const formSchema = (t) =>
  Yup.object().shape({
    time: Yup.array()
      .transform((value) =>
        value?.filter(Boolean)?.length === 0 ? null : value,
      )
      .nullable()
      .required(t("general:form.required")),
  });
