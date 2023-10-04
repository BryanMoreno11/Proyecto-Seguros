import { core } from '@angular/compiler';
import { Request, Response } from 'express';
import * as nodeMailer from 'nodemailer';
const pdfMake = require('pdfmake/build/pdfmake'); // Importa pdfmake
const pdfFonts = require('pdfmake/build/vfs_fonts'); // Importa pdfmake
const fs = require('fs'); // Para trabajar con archivos
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class CorreoController {

  // Función para generar un PDF a partir de una definición
  private static generatePdf(pdfDefinition: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const pdfDoc = pdfMake.createPdf(pdfDefinition);
      pdfDoc.getBuffer((buffer: Buffer) => {
        resolve(buffer);
      });
    });
  }

  // Función para enviar un correo con PDF adjunto
  public async envioCorreo(req: Request, resp: Response): Promise<void> {
    let body = req.body;

    const lineasDescripcion = body.descripcion.split('\\n');
    const contenidoDescripcion = lineasDescripcion.map((linea:string) => {
      return {
        text: linea,
      };
    });

    const pdfDefinition = {
      content: [
        {
	        image: 'data:image/png;base64,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',
	        width: 75,
          alignment: 'left'
		    },
        {
          text: '\nFacilita Seguros\n',
          style: 'header',
        },
        {
          text:[
            {text: '\nCorreo: ', bold: true}, body.email, '\n',
            {text: 'Asunto: ', bold: true}, body.asunto, '\n',
            {text: 'Mensaje: ', bold: true}, body.mensaje, '\n',
          ]
        },
        {
          text:'Estimado '+body.nombre+ ' ' +body.apellido+', ',
          margin: [0, 20, 0 ,10],
        },
        {
          text:[
            {text:'Estamos complacidos de informarte que la solicitud de seguro ha sido aceptada y confirmada con exito. Gracias por elegir a  '},
            {text: body.nombre_aseguradora+'', bold: true},
            {text:  ' como tu socio en la protección de tu automovil.\n\n Te presentamos los detalles de tu aseguradora: '},
          ],
          
          style: 'justificado'
        },
        {
          ul:[
            [{text: 'Nombre: ', bold: true},{text:body.nombre_aseguradora, margin: [0, 0, 0, 10]}],
            [{text: 'Correo: ', bold: true},{text:body.correo_aseguradora, margin: [0, 0, 0, 10]}],
            [{text: 'Telefono: ', bold: true},{text:body.telefono_aseguradora, margin: [0, 0, 0, 10]}]
          ],
          style: 'lista',
        },
        {
          text: 'La aseguradora en cuestión puede ofrecer los siguientes paquetes: \n\n',
        },
        {
          stack: contenidoDescripcion,
          style: 'parrafoConSangria'
        },
        {
          text: '\n\nMuy pronto se comunicara contigo la aseguradora para continuar con el proceso de adquisición\n',
        },
        {
          text: 'Esperamos haber sido de ayuda en tu elección y poder seguir ayudandote a futuro. ¡Gracias!\n',
        },
      ],
      background: {
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA7CAYAAADLjIzcAAAHn0lEQVRoge1bT17bRhT+3kh2yE45QZQTxJyg8qJFsAk5QeAEwAmAE+CcADhBWIHSLFBOUPcEUU5QdRXHtubrQrJB0kiWbGPa36/fykgzmnlv3rz/AM8Bj47a5YX4CWUn+Uv5PH2WfQCQja+4O90XLZcQOIU3ETHuI3gZbXI7m2OAP/EE1ilAr26YAFca4/NNMeLpGdCQ8BwEsRA3m2DE+hng0cHWtKdg/0LoAwBuzfLhYsZISOhrJHqIL93hWveKdTDAn3gK6gMhLkAXtQTPERH6MN2Aum+8FhFDSQQiJvQ1MAlXlZDVGLA37om2/mg8nogp+iOCzhmA7Hq0YEARIkPeqe2l5wNQq0wG5aDRMDAkkxP+VG/mxK8DZA+/jnurfMJebQNSNGXZc8QUDgF+RcKbp7i7c1gVe2iI1RhQAKk/QqYDfN6sLV8Fq12BIoTDTTsyq2K9DPgP4n8GPPcGnhv/M+C5N/DcsOHTFfICAof4efhf0+JtoXZ4ROG+QEIdyLkt0PeQ1H8XdO8JvHnuTT4Z/IlH6AEAEPTgT0QhH7y4+HXcg0dH+cnl8+xyzfDpYmcyAAAF9SH/Ur0ue4I2PHyRAf3Ew+74GHfdQdO1BNYl2jBOEJO633g8AIG6RLOIMx1P/YmK1wBAolcM/8oMoPUWAAh+nf1WfnKqA+u8zUYbgYgRdMJWc/xk8Zi9cQ9a9TCybiC6B8oJAEBQCpwUgLzSI1+lgxkL4KWP2IM/KUdxwrjV5tcBlnKJJYi2PgGMsDVNCU4Yw6dBavR3BSJHhIi8TReSIQAXHh1CfxVYv5Tnc7MWw6dbSqaO7HykmYbHbvY8zTZ96Q6BaZkBwlgBJSKygdnzbuJBOjcAPXjMLy7ydGGuEUkxfRYhlLwUKngEQ4QSC+Ut5hIuZQYkKlIU/F16scfXgJ1OtLSLIE1D4eUknwAJOmFRgp4SAsnVDwiU9IeI/Q7kn9lfLucHbLgCyiwBwGTyCqOMsEwRAoge/X7YhNLX7chYDlnxpEBEYW2PDkAPKqNJ0ANnB2yQAGV/U4CUGWCJg1DiVMTTRfjZ2oZKPpbGCq+WIagVfLqEzilhgqHJgnCkXuGuO4BHh5KcGA94hlv5bkMjLkcEqbjwh/QRdh5E/NaQ2rrtDrk7+ShUR62IagqfrkAbEqeTw9Kjx/og/T33YQTqNcCHsZJKuIKyqhVZKLHa4ZH4ybfaGt4P+wxFc7oOPBCfE19CmwsmPl3x9b34CcXX9/B/VDpMJIcAoOZ3PfdWerMPUvQAgJsGS/oMu8lxaXwoMVXyfq0KcW/cMxPPsCqznI6fFVroCV48eKWkMXusEEpc8gWU+gCPDnRSmiTEBfxJuZpz2x1SeLKQsAZQOzySxCoRDyDCyHpvnLPLi9J4yYj2pwflYmyq+9LbL4WTIxxsTY8xtoxuqkBdGsUrsK8Ilu9mU/gTT3x9T9GD0oZFhsS4X7L7yEJc6pJkzsS8aD5T6O/APCFStgQiqVKj6LLmB9yceD1GYF9RJdtooxMywtMqUblWSDDkDzGXzh+uqQGTQ/jTivokHySAGTcKq6ZSUKng6GViV8Ztd0ioflr8rIHAqSMcACjJCQLbePLVFiKrUQQvI/PpA4UrYA5qRNQRtkbOrJBpWOQYPj+Y3iGQiIHqp7a4QhoIp5JwMKRKtuvCcRHDvU8R4ad9ZnaeMiTMzCBQHdQQjuDFZepwmE9TRA/qzA3uugNC9Qk28xiJeH7qJr8jg/J5CnLf/AmeYwuOSS/MMelEwKw6vKBKS+F70BoK9R+G1hYAiDhS20YxfQyfLpCcCeVd8TsEQwDXGFk3C7+zO90XyifjXoErBNah8pNLAubiLWXIz2lVeZ4fET/5hupMS0rg1vRYoMx3SmSYeo4LNg9kTRTJPgTvQIkBfd04MbI37kli3VccBIjxG6DjCaQyM0XBCe6sAfC4P2B3fCy0zEoNgIga6Ds5WcioJ2x0Ujs8IvRZNfH6HLCvTA5U1R5zGTLxdaU2zhbop5NqmhoEMadJf90lcbXLi9o7DUQMrDe1og+A4CECex7A5VOEFb53bpGR2sZWMhCIWfunX10rE5TP02I0WESqp+DUij70edGNzseBgUSE6tf49K684KWC9a12x4QjtnW/avcG0Ix4CGKQcbXNByhyY4ohzD1Cv033RZm1bEs0sw5V8KcHdSe6jn2Ya4O/2zepQlkZrnqJ5dpgPTp1J9oCUVUMAdQVR4POWUUc0AqEPiglU5tgK9lHiwJIzfq19c766vBd5zhLj6+ygzSmaIl1nH6m9Gr9i4XlcYq8x4rZHqH1rtWENN+w0umbNL4Ji/sDFluGxRD2Wl0DvVrrW13WqIhmDRKBROQKiQ4A8zJVEyhz+qohImPCtGqpxp9dn2V4OhBxW1e8XYtM0DmTpmHtM4CKrTtcWvcI6ZG1nGVQdr33mIOhWLMAhD7HnX3Tdl77JqlQYvJfdxWiZZuwl+sSo25vFm+lnHesgm5ncVhX/lqA5RhgdZ62Iqw213ixmT7BYt3hX4TNMGCDPQRtsRwDZg0TTcGW4XDS8grMGyLaY+l/mKCobWPfjQk/7XZm80t3SH/SvH2u7fcf4R8dsK9VG8J13QAAAABJRU5ErkJggg==',
        width: 200,
        height: 200,
        opacity: 0.2,
        fit: [400,400],
        absolutePosition: {x:100,y:180}
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'left'
        },
        justificado:{
          alignment: 'justify',
          margin: [0, 20, 0 ,10],
        },
        parrafoConSangria:{
          margin: [20,0,0,0]
        },
        lista:{
          margin: [20,0,0,20]
        }
      },
    };
  
    try {
      const pdfBuffer = await CorreoController.generatePdf(pdfDefinition);
  
      let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'aseguradoraemails@gmail.com',
          pass: 'kjke bafg hivp wusv',
        },
      });
  
      const opciones = {
        from: 'Daniel',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje,
        attachments: [
          {
            filename: 'documento.pdf',
            content: pdfBuffer,
          },
        ],
      };
  
      config.sendMail(opciones, function (error: any, result: any) {
        if (error) {
          resp.status(500).json({
            ok: false,
            msg: error,
          });
        } else {
          resp.json({
            ok: true,
            msg: result,
          });
        }
      });
    } catch (error) {
      console.error('Error al generar o enviar el correo:', error);
      resp.status(500).json({
        ok: false,
        msg: 'Error al enviar el correo',
      });
    }
  }  

  public async envioCorreoAseguradora(req: Request, resp: Response): Promise<void> {
    let body = req.body;
    
    const pdfDefinition = {
      content: [
        {
	        image: 'data:image/png;base64,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',
	        width: 75,
          alignment: 'left'
		    },
        {
          text: '\nFacilita Seguros\n',
          style: 'header',
        },
        {
          text:[
            {text: '\nCorreo: ', bold: true}, body.email, '\n',
            {text: 'Asunto: ', bold: true}, body.asunto, '\n',
            {text: 'Mensaje: ', bold: true}, body.mensaje, '\n',
          ]
        },
        {
          text:'Estimada aseguradora: ' +body.nombre_aseguradora+', ',
          margin: [0, 20, 0 ,10],
        },
        {
          text:'Estamos complacidos de informarles que hemos recibido una solicitud para aplicar en su aseguradora. \n\nA continuación te presentamos los detalles del cliente para que procedan: ',
          style: 'justificado',          
        },
        {
          ul:[
            [{text: 'Cedula: ', bold: true},{text:body.cedula, margin: [0, 0, 0, 10]}],
            [{text: 'Nombre: ', bold: true},{text:body.nombre +' '+body.apellido, margin: [0, 0, 0, 10]}],
            [{text: 'Localidad: ', bold: true},{text:body.ciudad +' ,'+body.provincia, margin: [0, 0, 0, 10]}],
            [{text: 'Correo: ', bold: true},{text:body.email, margin: [0, 0, 0, 10]}],
            [{text: 'Telefono: ', bold: true},{text:body.telefono_cliente, margin: [0, 0, 0, 10]}]
          ],
          style: 'lista',
        },
        {
          text: 'El cliente en cuestión cuenta con el siguiente equipo: \n\n',
        },
        {
          ul:[
            [{text: 'Marca: ', bold: true},{text:body.marca, margin: [0, 0, 0, 10]}],
            [{text: 'Modelo: ', bold: true},{text:body.modelo, margin: [0, 0, 0, 10]}],
            [{text: 'Año: ', bold: true},{text:body.anio, margin: [0, 0, 0, 10]}],
            [{text: 'Precio: ', bold: true},{text:body.precio, margin: [0, 0, 0, 10]}],
          ],
          style: 'lista',
        },
        {
          text: 'Por favor, comunicarse cuanto antes con el cliente para continuar con el proceso de adquisición, muchas gracias.',
          style: 'justificado',
        },
      ],
      background: {
        image: 'data:image/png;base64,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',
        width: 200,
        height: 200,
        opacity: 0.2,
        fit: [400,400],
        absolutePosition: {x:100,y:180}
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'left'
        },
        justificado:{
          alignment: 'justify',
          margin: [0, 20, 0 ,10],
        },
        parrafoConSangria:{
          margin: [20,0,0,0]
        },
        lista:{
          margin: [20,0,0,20]
        }
      },
    };
  
    try {
      const pdfBuffer = await CorreoController.generatePdf(pdfDefinition);
  
      let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'aseguradoraemails@gmail.com',
          pass: 'kjke bafg hivp wusv',
        },
      });
  
      const opciones = {
        from: 'Daniel',
        subject: body.asunto,
        to: body.correo_aseguradora,
        text: body.mensaje,
        attachments: [
          {
            filename: 'documento.pdf',
            content: pdfBuffer,
          },
        ],
      };
  
      config.sendMail(opciones, function (error: any, result: any) {
        if (error) {
          resp.status(500).json({
            ok: false,
            msg: error,
          });
        } else {
          resp.json({
            ok: true,
            msg: result,
          });
        }
      });
    } catch (error) {
      console.error('Error al generar o enviar el correo:', error);
      resp.status(500).json({
        ok: false,
        msg: 'Error al enviar el correo',
      });
    }
  }

  public async envioCorreoVida(req: Request, resp: Response): Promise<void> {
    let body = req.body;

    const pdfDefinition = {
      content: [
        {
	        image: 'data:image/png;base64,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',
	        width: 75,
          alignment: 'left'
		    },
        {
          text: '\nFacilita Seguros\n',
          style: 'header',
        },
        {
          text:[
            {text: '\nCorreo: ', bold: true}, body.email, '\n',
            {text: 'Asunto: ', bold: true}, body.asunto, '\n',
            {text: 'Mensaje: ', bold: true}, body.mensaje, '\n',
          ]
        },
        {
          text:'Estimado '+body.nombre+ ' ' +body.apellido+', ',
          margin: [0, 20, 0 ,10],
        },
        {
          text:[
            {text:'Estamos complacidos de informarte que la solicitud de plan de seguro de vida ha sido aceptada y confirmada con exito. Gracias por elegir a  '},
            {text: body.nombre_aseguradora+'', bold: true},
            {text:  ' como tu socio en la protección de tu bienestar.\n\n Te presentamos los detalles de tu elección: '},
          ],
          
          style: 'justificado'
        },
        {
          ul:[
            [{text: 'Nombre: ', bold: true},{text:body.nombre_plan, margin: [0, 0, 0, 10]}],
            [{text: 'Descripcion: ', bold: true},{text:body.descripcion_plan, margin: [0, 0, 0, 10]}],
            [{text: 'Precio del plan: ', bold: true},{text: '$'+ body.precio_plan, margin: [0, 0, 0, 10]}],
            [{text: 'Telefono Aseguradora: ', bold: true},{text:body.telefono_cliente, margin: [0, 0, 0, 10]}],
            [{text: 'Correo Aseguradora: ', bold: true},{text:body.aseguradora_correo, margin: [0, 0, 0, 10]}]
          ],
          style: 'lista',
        },
        {
          text: 'Muy pronto se comunicara contigo la aseguradora para continuar con el proceso de adquisición.\n',
        },
        {
          text: '\nEsperamos haber sido de ayuda en tu elección y poder seguir ayudandote a futuro. ¡Gracias!\n',
        },
      ],
      background: {
        image: 'data:image/png;base64,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',
        width: 200,
        height: 200,
        opacity: 0.2,
        fit: [400,400],
        absolutePosition: {x:100,y:180}
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'left'
        },
        justificado:{
          alignment: 'justify',
          margin: [0, 20, 0 ,10],
        },
        parrafoConSangria:{
          margin: [20,0,0,0]
        },
        lista:{
          margin: [20,0,0,20]
        }
      },
    };
  
    try {
      const pdfBuffer = await CorreoController.generatePdf(pdfDefinition);
  
      let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'aseguradoraemails@gmail.com',
          pass: 'kjke bafg hivp wusv',
        },
      });
  
      const opciones = {
        from: 'Daniel',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje,
        attachments: [
          {
            filename: 'documento.pdf',
            content: pdfBuffer,
          },
        ],
      };
  
      config.sendMail(opciones, function (error: any, result: any) {
        if (error) {
          resp.status(500).json({
            ok: false,
            msg: error,
          });
        } else {
          resp.json({
            ok: true,
            msg: result,
          });
        }
      });
    } catch (error) {
      console.error('Error al generar o enviar el correo:', error);
      resp.status(500).json({
        ok: false,
        msg: 'Error al enviar el correo',
      });
    }
  }

  public async envioCorreoAseguradoraVida(req: Request, resp: Response): Promise<void> {
    let body = req.body;
    
    const pdfDefinition = {
      content: [
        {
	        image: 'data:image/png;base64,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',
	        width: 75,
          alignment: 'left'
		    },
        {
          text: '\nFacilita Seguros\n',
          style: 'header',
        },
        {
          text:[
            {text: '\nCorreo: ', bold: true}, body.aseguradora_correo, '\n',
            {text: 'Asunto: ', bold: true}, body.asunto, '\n',
            {text: 'Mensaje: ', bold: true}, body.mensaje, '\n',
          ]
        },
        {
          text:'Estimada aseguradora: ' +body.nombre_aseguradora+', ',
          margin: [0, 20, 0 ,10],
        },
        {
          text:'Estamos complacidos de informarles que hemos recibido una solicitud para aplicar en su aseguradora. \n\nA continuación te presentamos los detalles del cliente para que procedan: ',
          style: 'justificado',          
        },
        {
          ul:[
            [{text: 'Cedula: ', bold: true},{text:body.cedula, margin: [0, 0, 0, 10]}],
            [{text: 'Nombre: ', bold: true},{text:body.nombre +' '+body.apellido, margin: [0, 0, 0, 10]}],
            [{text: 'Localidad: ', bold: true},{text:body.ciudad +' ,'+body.provincia, margin: [0, 0, 0, 10]}],
            [{text: 'Correo: ', bold: true},{text:body.email, margin: [0, 0, 0, 10]}],
            [{text: 'Telefono: ', bold: true},{text:body.telefono_cliente, margin: [0, 0, 0, 10]}]
          ],
          style: 'lista',
        },
        {
          text: 'El cliente en cuestión selecciono lo siguiente: \n\n',
        },
        {
          ul:[
            [{text: 'Nombre: ', bold: true},{text:body.nombre_plan, margin: [0, 0, 0, 10]}],
            [{text: 'Descripcion: ', bold: true},{text:body.descripcion_plan, margin: [0, 0, 0, 10]}],
            [{text: 'Precio: ', bold: true},{text:body.precio_plan, margin: [0, 0, 0, 10]}],          ],
          style: 'lista',
        },
        {
          text: 'Por favor, comunicarse cuanto antes con el cliente para continuar con el proceso de adquisición, muchas gracias.',
          style: 'justificado',
        },
      ],
      background: {
        image: 'data:image/png;base64,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',
        width: 200,
        height: 200,
        opacity: 0.2,
        fit: [400,400],
        absolutePosition: {x:100,y:180}
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'left'
        },
        justificado:{
          alignment: 'justify',
          margin: [0, 20, 0 ,10],
        },
        parrafoConSangria:{
          margin: [20,0,0,0]
        },
        lista:{
          margin: [20,0,0,20]
        }
      },
    };
  
    try {
      const pdfBuffer = await CorreoController.generatePdf(pdfDefinition);
  
      let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'aseguradoraemails@gmail.com',
          pass: 'kjke bafg hivp wusv',
        },
      });
  
      const opciones = {
        from: 'Daniel',
        subject: body.asunto,
        to: body.aseguradora_correo,
        text: body.mensaje,
        attachments: [
          {
            filename: 'documento.pdf',
            content: pdfBuffer,
          },
        ],
      };
  
      config.sendMail(opciones, function (error: any, result: any) {
        if (error) {
          resp.status(500).json({
            ok: false,
            msg: error,
          });
        } else {
          resp.json({
            ok: true,
            msg: result,
          });
        }
      });
    } catch (error) {
      console.error('Error al generar o enviar el correo:', error);
      resp.status(500).json({
        ok: false,
        msg: 'Error al enviar el correo',
      });
    }
  }


}

const correoController= new CorreoController();
export default correoController;

