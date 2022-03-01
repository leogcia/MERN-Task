import nodemailer from 'nodemailer';

export const emailRegistro = async ( datos ) => {
    const { email, nombre, token } = datos;
    //Desde mailtrap:
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8c020614e4813d",
          pass: "bd39ed27f8ff59"
        }
      });

    //informacion del email:
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: 'Uptask - Confirma tu cuenta.',
        text: 'Confirma tu Cuenta en Uptask.',
        html: `<p>Hola: ${nombre} Confirma tu cuenta en Uptask.</p>
        <p>Tu cuenta está casi lista, solo debes comprobarla en el siguinte enlace:</p>

        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
};

export const emailOlvidePassword = async ( datos ) => {
  const { email, nombre, token } = datos;
  //Desde mailtrap:
  const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8c020614e4813d",
        pass: "bd39ed27f8ff59"
      }
    });

  //informacion del email:
  const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
      to: email,
      subject: 'Uptask - Reestablece tu password.',
      text: 'Confirma tu Cuenta en Uptask.',
      html: `<p>Hola: ${nombre} has solicitado reestablecer tu password.</p>
      <p>Sigue el siguinte enlace:</p>

      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>

      <p>Si tu no solicitaste reestablecer tu cuenta, puedes ignorar el mensaje</p>
      `
  })
};