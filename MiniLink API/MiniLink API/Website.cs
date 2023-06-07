namespace MiniLink_API
{
    public class Website
    {
        public required int Id { get; set; }

        public required string Title { get; set; }

        public required string Weblink { get; set; }

        public required DateTime DateAdded { get; set; }
    }
}
