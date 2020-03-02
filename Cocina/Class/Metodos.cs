using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web;

namespace Cocina.Class
{
    public class Metodos
    {
        public string enviarCorreo(string correo)
        {
            var codigo = generatePassword(7);
            string subject = "Recuperación de contraseña";
            string contenido = "";
            contenido += "<center>";
            contenido += "<h4>";
            contenido += "Recuperación de contraseña<br>";
            contenido += "Ha solicitado una nueva contraseña<br>";
            contenido += "Codigo de Seguridad:" + codigo + "<br><br>";
            contenido += "</center>";
            
            if (sendMail(contenido, correo, subject))
            {
                return codigo;
            }
            else
            {
                return "Hubo un error";
            }

        }

        public static string generatePassword(int lenght)
        {
            Random obj = new Random();
            string posibles = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            int longitud = posibles.Length;
            char letra;
            int longitudnuevacadena = lenght;
            string nuevacadena = "";
            for (int i = 0; i < longitudnuevacadena; i++)
            {
                letra = posibles[obj.Next(longitud)];
                nuevacadena += letra.ToString();
            }
            return nuevacadena;
        }

        public static Boolean sendMail(string content, string destination, string subject)
        {
            try
            {
                MailMessage correo = new MailMessage();
                correo.From = new MailAddress("notificacion@coqueta.com.mx", "Kyocode", System.Text.Encoding.UTF8);//Correo de salida
                correo.To.Add(destination); //Correo destino
                correo.Subject = subject; //Asunto
                correo.Body = content; //Mensaje del correo
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;
                SmtpClient smtp = new SmtpClient();
                smtp.UseDefaultCredentials = false;
                smtp.Host = "mail.coqueta.com.mx"; //Host del servidor de correo
                smtp.Port = 500; //Puerto de salida
                smtp.Credentials = new System.Net.NetworkCredential("notificacion", "Coq1904");//Cuenta de correo
                ServicePointManager.ServerCertificateValidationCallback = delegate (object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };
                smtp.EnableSsl = false;//True si el servidor de correo permite ssl
                smtp.Send(correo);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}