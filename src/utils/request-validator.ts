import { validator } from 'hono/validator'

type RulesType = {
  required?: Array<string>;
  type?: string;
}

const requestValidator = (target: 'json', rules : RulesType) => {
  return validator(target, async (value, c) => {
    try {
      let request;
      if (target === 'json') {
        const contentType = c.req.header("content-type") || "";

        if (!contentType.includes("application/json")) {
          c.status(400);
          return c.json({ status: 400, message: "Content-Type must be application/json" });
        }

        request = await c.req.json();
      } else {
        request = await c.req.formData();
      }

      const error = checkRequired(request, rules.required || []);
      if (error) {
        c.status(400);
        return c.json({ message: `${error} must be provided` });
      }

    } catch (error) {
      c.status(500);
      return c.json({ message: "An error occurred while processing the request" });
    }

  });
}

const checkRequired = (data: any, fields: string[]) => {
  for (let i = 0; i < fields.length; i++) {
    if (!data[fields[i]]) {
      return fields[i];
    }
  }
  return null;
}

export default requestValidator;