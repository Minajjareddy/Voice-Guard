import java.util.*;

class Scan {
    String fileName;
    int score;
    String result;
    String time;

    Scan(String fileName, int score, String result, String time) {
        this.fileName = fileName;
        this.score = score;
        this.result = result;
        this.time = time;
    }
}

class User {
    String name;
    String email;
    String password;

    User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

public class VoiceGuard {

    static Scanner sc = new Scanner(System.in);
    static User user = null;
    static List<Scan> scans = new ArrayList<>();

    static int AI_THRESHOLD = 70;
    static int SUS_THRESHOLD = 30;

    public static void main(String[] args) {

        while (true) {
            System.out.println("\n=== VoiceGuard AI ===");
            System.out.println("1. Sign Up");
            System.out.println("2. Login");
            System.out.println("3. Exit");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    signup();
                    break;

                case 2:
                    login();
                    break;

                case 3:
                    System.out.println("Exiting...");
                    return;
            }
        }
    }

    static void signup() {
        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.print("Enter email: ");
        String email = sc.nextLine();

        System.out.print("Enter password: ");
        String pass = sc.nextLine();

        user = new User(name, email, pass);

        System.out.println("Account created successfully!");
    }

    static void login() {

        if (user == null) {
            System.out.println("No account found. Please sign up first.");
            return;
        }

        System.out.print("Email: ");
        String email = sc.nextLine();

        System.out.print("Password: ");
        String pass = sc.nextLine();

        if (email.equals(user.email) && pass.equals(user.password)) {
            System.out.println("Login successful!");
            dashboard();
        } else {
            System.out.println("Invalid login.");
        }
    }

    static void dashboard() {

        while (true) {

            System.out.println("\n=== Dashboard ===");
            System.out.println("1. Upload Audio");
            System.out.println("2. View Scan History");
            System.out.println("3. View Stats");
            System.out.println("4. Settings");
            System.out.println("5. Logout");

            int ch = sc.nextInt();
            sc.nextLine();

            switch (ch) {
                case 1:
                    uploadAudio();
                    break;

                case 2:
                    showHistory();
                    break;

                case 3:
                    showStats();
                    break;

                case 4:
                    settings();
                    break;

                case 5:
                    return;
            }
        }
    }

    static void uploadAudio() {

        System.out.print("Enter audio file name: ");
        String file = sc.nextLine();

        System.out.println("Analyzing audio...");

        Random rand = new Random();
        int score = rand.nextInt(100) + 1;

        String result;

        if (score >= AI_THRESHOLD)
            result = "AI Generated Voice";
        else if (score >= SUS_THRESHOLD)
            result = "Suspicious Voice";
        else
            result = "Authentic Voice";

        String time = new Date().toString();

        scans.add(new Scan(file, score, result, time));

        System.out.println("\nRESULT:");
        System.out.println(result);
        System.out.println("AI Probability: " + score + "%");
    }

    static void showHistory() {

        if (scans.isEmpty()) {
            System.out.println("No scans yet.");
            return;
        }

        System.out.println("\n=== Scan History ===");

        for (Scan s : scans) {
            System.out.println(
                    s.fileName + " | Score: " + s.score + "% | " + s.result + " | " + s.time
            );
        }
    }

    static void showStats() {

        int total = scans.size();
        int real = 0;
        int fake = 0;

        for (Scan s : scans) {
            if (s.result.equals("Authentic Voice"))
                real++;
            if (s.result.equals("AI Generated Voice"))
                fake++;
        }

        System.out.println("\n=== Stats ===");
        System.out.println("Total Scans: " + total);
        System.out.println("Authentic Voices: " + real);
        System.out.println("AI Voices: " + fake);
    }

    static void settings() {

        System.out.println("\n=== Settings ===");

        System.out.print("AI Detection Threshold (%): ");
        AI_THRESHOLD = sc.nextInt();

        System.out.print("Suspicious Threshold (%): ");
        SUS_THRESHOLD = sc.nextInt();

        sc.nextLine();

        System.out.println("Settings saved.");
    }
}
